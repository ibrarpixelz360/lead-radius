<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import {
    LayoutDashboard, Search, Sparkles, Users, BarChart3, Wallet, CreditCard,
    LogOut, Menu, X, Bell, Sun, Moon, ChevronDown, ChevronUp,
    UserCog, Shield, Settings2,
} from 'lucide-vue-next';

const page = usePage();
const sidebarOpen    = ref(false);
const userMenuOpen   = ref(false);
const userMenuRef    = ref(null);

const isDark = ref(
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
);
if (isDark.value) document.documentElement.classList.add('dark');

const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark.value);
};

const user         = computed(() => page.props.auth.user);
const subscription = computed(() => page.props.auth.subscription);

const userInitials = computed(() => {
    const parts = (user.value?.name || '').split(' ').filter(Boolean);
    return parts.map(p => p[0].toUpperCase()).slice(0, 2).join('') || '?';
});

const nav = [
    { name: 'Dashboard',      href: route('dashboard'),             icon: LayoutDashboard, current: () => route().current('dashboard') },
    { name: 'Lead Generator', href: route('leads.search.create'),   icon: Sparkles,        current: () => route().current('leads.search.*') || route().current('leads.generator*') || route().current('leads.searches.*') },
    { name: 'My Leads',       href: route('leads.index'),           icon: Users,           current: () => route().current('leads.index') || route().current('leads.show') },
    { name: 'Saved Searches', href: route('leads.saved.index'),     icon: BarChart3,       current: () => route().current('leads.saved.*') },
    { name: 'Exports',        href: route('leads.exports.index'),   icon: Wallet,          current: () => route().current('leads.exports.*') },
    { name: 'Affiliate',      href: route('affiliate.index'),       icon: Wallet,          current: () => route().current('affiliate.*') },
    { name: 'Billing',        href: route('billing.index'),         icon: CreditCard,      current: () => route().current('billing.*') },
];

const logout = () => router.post(route('logout'));

// Close user menu when clicking outside
const onClickOutside = (e) => {
    if (userMenuRef.value && !userMenuRef.value.contains(e.target)) {
        userMenuOpen.value = false;
    }
};
onMounted(() => document.addEventListener('mousedown', onClickOutside));
onBeforeUnmount(() => document.removeEventListener('mousedown', onClickOutside));
</script>

<template>
    <div class="min-h-screen bg-surface-50 dark:bg-surface-950">

        <!-- Mobile sidebar backdrop -->
        <div v-if="sidebarOpen" @click="sidebarOpen = false"
             class="fixed inset-0 z-40 bg-black/50 lg:hidden" />

        <!-- ── Sidebar ── -->
        <aside :class="[
            'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 transition-transform lg:translate-x-0 flex flex-col',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]">
            <!-- Logo -->
            <div class="flex h-16 items-center justify-between px-6 border-b border-surface-200 dark:border-surface-800 flex-shrink-0">
                <Link href="/" class="flex items-center gap-2">
                    <div class="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">C</div>
                    <span class="font-bold text-surface-900 dark:text-surface-50">CustomerNearMe</span>
                </Link>
                <button @click="sidebarOpen = false" class="lg:hidden">
                    <X class="h-5 w-5" />
                </button>
            </div>

            <!-- Nav -->
            <nav class="flex-1 overflow-y-auto p-4 space-y-1">
                <Link v-for="item in nav" :key="item.name" :href="item.href"
                      :class="[
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
                          item.current()
                              ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                              : 'text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800'
                      ]">
                    <component :is="item.icon" class="h-5 w-5 flex-shrink-0" />
                    {{ item.name }}
                </Link>
            </nav>

            <!-- Trial banner -->
            <div v-if="subscription?.is_trial" class="mx-4 mb-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 flex-shrink-0">
                <p class="text-xs font-semibold text-primary-700 dark:text-primary-300">
                    Trial: {{ subscription.days_remaining }} days left
                </p>
                <Link :href="route('billing.index')" class="mt-2 block text-center text-xs btn-primary">
                    Upgrade Plan
                </Link>
            </div>

            <!-- ── Bottom user section ── -->
            <div ref="userMenuRef" class="border-t border-surface-200 dark:border-surface-800 flex-shrink-0 relative">

                <!-- User menu popup (opens upward) -->
                <Transition
                    enter-active-class="transition duration-150 ease-out"
                    enter-from-class="opacity-0 translate-y-2"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-2">
                    <div v-if="userMenuOpen"
                        class="absolute bottom-full left-3 right-3 mb-2 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 shadow-xl overflow-hidden">

                        <!-- Online status -->
                        <div class="px-4 py-3 border-b border-surface-100 dark:border-surface-800">
                            <div class="flex items-center gap-2">
                                <span class="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"></span>
                                <span class="text-sm font-semibold text-surface-900 dark:text-white">Online</span>
                            </div>
                            <p v-if="user?.last_login_at" class="text-xs text-surface-500 mt-0.5 pl-4">
                                Last active: {{ user.last_login_at }}
                            </p>
                        </div>

                        <!-- Menu items -->
                        <div class="py-2">
                            <Link :href="route('profile.edit')"
                                @click="userMenuOpen = false"
                                class="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                                <UserCog class="h-5 w-5 text-surface-400" />
                                Edit Profile
                            </Link>
                            <Link :href="route('profile.edit')"
                                @click="userMenuOpen = false"
                                class="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                                <Shield class="h-5 w-5 text-surface-400" />
                                Security Settings
                            </Link>
                            <Link :href="route('profile.edit')"
                                @click="userMenuOpen = false"
                                class="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                                <Settings2 class="h-5 w-5 text-surface-400" />
                                Preferences
                            </Link>
                        </div>

                        <!-- Stats row -->
                        <div class="px-3 pb-3 grid grid-cols-2 gap-2">
                            <div class="rounded-xl bg-blue-50 dark:bg-blue-900/20 px-3 py-2.5 text-center">
                                <p class="text-lg font-bold text-blue-600 dark:text-blue-400 leading-none">{{ user?.leads_count ?? 0 }}</p>
                                <p class="text-xs text-surface-500 mt-0.5">Leads</p>
                            </div>
                            <div class="rounded-xl bg-green-50 dark:bg-green-900/20 px-3 py-2.5 text-center">
                                <p class="text-lg font-bold text-green-600 dark:text-green-400 leading-none">{{ user?.devices_count ?? 0 }}</p>
                                <p class="text-xs text-surface-500 mt-0.5">Devices</p>
                            </div>
                        </div>

                        <!-- Sign out -->
                        <div class="border-t border-surface-100 dark:border-surface-800 px-3 py-2">
                            <button @click="logout"
                                class="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                                <LogOut class="h-5 w-5" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </Transition>

                <!-- Trigger button -->
                <button @click="userMenuOpen = !userMenuOpen"
                    class="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                    <!-- Avatar -->
                    <div class="relative flex-shrink-0">
                        <div class="h-9 w-9 rounded-full overflow-hidden bg-primary-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            <img v-if="user?.avatar_url" :src="user.avatar_url" class="w-full h-full object-cover" :alt="user.name" />
                            <span v-else>{{ userInitials }}</span>
                        </div>
                        <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-surface-900"></span>
                    </div>

                    <!-- Name + email -->
                    <div class="flex-1 text-left min-w-0">
                        <p class="text-sm font-semibold text-surface-900 dark:text-white truncate leading-tight">{{ user?.name }}</p>
                        <p class="text-xs text-surface-400 truncate">{{ user?.email?.replace(/(.{12}).*(@.*)/, '$1...$2') }}</p>
                    </div>

                    <!-- Chevron + verified badge -->
                    <div class="flex items-center gap-1 flex-shrink-0">
                        <span class="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                            <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </span>
                        <component :is="userMenuOpen ? ChevronUp : ChevronDown" class="h-4 w-4 text-surface-400" />
                    </div>
                </button>
            </div>
        </aside>

        <!-- ── Main column ── -->
        <div class="lg:pl-64">
            <header class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-200 dark:border-surface-800 bg-white/80 dark:bg-surface-900/80 backdrop-blur px-4 lg:px-6">
                <button @click="sidebarOpen = true" class="lg:hidden">
                    <Menu class="h-6 w-6" />
                </button>

                <div class="flex-1"></div>

                <div class="flex items-center gap-2">
                    <button @click="toggleTheme" class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                        <Sun v-if="isDark" class="h-5 w-5 text-surface-600 dark:text-surface-300" />
                        <Moon v-else class="h-5 w-5 text-surface-600" />
                    </button>
                    <Link :href="route('notifications.index')" class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 relative transition-colors">
                        <Bell class="h-5 w-5 text-surface-600 dark:text-surface-300" />
                    </Link>
                </div>
            </header>

            <main class="p-4 lg:p-8">
                <slot />
            </main>
        </div>

    </div>
</template>
