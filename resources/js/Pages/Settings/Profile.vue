<script setup>
import { Head, useForm, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref, computed } from 'vue';
import { User, Shield, Settings2, Camera, CheckCircle, AlertTriangle, LogIn, Clock } from 'lucide-vue-next';

const props = defineProps({
    mustVerifyEmail: Boolean,
    status:          String,
    profile:         Object,
});

// ── Active tab ────────────────────────────────────────────────────────────────
const activeTab = ref('personal');
const tabs = [
    { key: 'personal',     label: 'Personal Info', icon: User    },
    { key: 'security',     label: 'Security',      icon: Shield  },
    { key: 'preferences',  label: 'Preferences',   icon: Settings2 },
];

// ── Split name ────────────────────────────────────────────────────────────────
const nameParts  = (props.profile?.name || '').split(' ');
const firstName  = ref(nameParts[0] || '');
const lastName   = ref(nameParts.slice(1).join(' ') || '');

// ── Avatar preview ────────────────────────────────────────────────────────────
const avatarPreview  = ref(props.profile?.avatar_url || null);
const avatarFileInput = ref(null);

const profileForm = useForm({
    name:         props.profile?.name      || '',
    email:        props.profile?.email     || '',
    phone:        props.profile?.phone     || '',
    country_code: props.profile?.country_code || 'PK',
    avatar:       null,
});

const onAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    profileForm.avatar = file;
    avatarPreview.value = URL.createObjectURL(file);
};

const updateProfile = () => {
    profileForm.name = [firstName.value, lastName.value].filter(Boolean).join(' ');
    profileForm.post(route('profile.update'), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => { profileForm.avatar = null; },
    });
};

// ── Password form ─────────────────────────────────────────────────────────────
const passwordForm = useForm({
    current_password:      '',
    password:              '',
    password_confirmation: '',
});
const updatePassword = () => passwordForm.put(route('profile.password'), {
    preserveScroll: true,
    onSuccess: () => passwordForm.reset(),
});

// ── Delete / clear modals ─────────────────────────────────────────────────────
const showDeleteModal    = ref(false);
const showClearModal     = ref(false);
const deleteForm = useForm({ password: '' });

const deleteAccount = () => deleteForm.delete(route('profile.destroy'), {
    onSuccess: () => { showDeleteModal.value = false; },
});
const clearData = () => router.delete(route('profile.clear-data'), {
    preserveScroll: true,
    onSuccess: () => { showClearModal.value = false; },
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const userInitials = computed(() => {
    const parts = (props.profile?.name || '').split(' ').filter(Boolean);
    return parts.map(p => p[0].toUpperCase()).slice(0, 2).join('');
});

const isVerified = computed(() => !!props.profile?.email_verified_at);
const roleLabel  = computed(() => {
    const roles = props.profile?.roles || [];
    if (roles.includes('super_admin')) return 'Super Admin';
    if (roles.includes('admin'))       return 'Admin';
    return 'Regular User';
});
</script>

<template>
    <Head title="Profile Settings" />
    <AuthenticatedLayout>
        <div class="w-full space-y-5">

            <!-- ── Blue profile header ── -->
            <div class="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 flex items-center justify-between gap-4 shadow-lg">
                <div class="flex items-center gap-5">
                    <!-- Avatar -->
                    <div class="relative flex-shrink-0">
                        <div class="w-16 h-16 rounded-full ring-4 ring-white/30 overflow-hidden bg-blue-400 flex items-center justify-center">
                            <img v-if="avatarPreview" :src="avatarPreview" class="w-full h-full object-cover" alt="Avatar" />
                            <span v-else class="text-xl font-bold text-white">{{ userInitials }}</span>
                        </div>
                        <button type="button" @click="avatarFileInput?.click()"
                            class="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-surface-100 transition-colors">
                            <Camera class="h-3.5 w-3.5 text-surface-600" />
                        </button>
                        <input ref="avatarFileInput" type="file" accept="image/*" class="hidden" @change="onAvatarChange" />
                    </div>

                    <!-- Name + badges -->
                    <div>
                        <h2 class="text-lg font-bold text-white leading-tight">{{ profile?.name || '—' }}</h2>
                        <p class="text-blue-100 text-sm mb-2">{{ profile?.email }}</p>
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                                <User class="h-3 w-3" /> {{ roleLabel }}
                            </span>
                            <span v-if="isVerified"
                                class="inline-flex items-center gap-1 bg-green-400/30 text-green-100 text-xs font-medium px-2.5 py-1 rounded-full border border-green-300/30">
                                <CheckCircle class="h-3 w-3" /> Email Verified
                            </span>
                            <span class="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                                <LogIn class="h-3 w-3" /> Email Login
                            </span>
                            <span v-if="profile?.status === 'active'"
                                class="inline-flex items-center gap-1 bg-green-400/30 text-green-100 text-xs font-medium px-2.5 py-1 rounded-full border border-green-300/30">
                                <CheckCircle class="h-3 w-3" /> Active
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Last login -->
                <div v-if="profile?.last_login_at" class="hidden md:flex items-center gap-2 text-right text-blue-100 text-sm flex-shrink-0">
                    <Clock class="h-4 w-4 text-blue-200" />
                    <div>
                        <p class="text-xs text-blue-200 font-medium">Last Login</p>
                        <p>{{ profile.last_login_at }}</p>
                    </div>
                </div>
            </div>

            <!-- ── Tabs + content ── -->
            <div class="card overflow-hidden">
                <!-- Tab bar -->
                <div class="border-b border-surface-200 dark:border-surface-700 px-6">
                    <nav class="flex gap-1 -mb-px">
                        <button v-for="tab in tabs" :key="tab.key"
                            @click="activeTab = tab.key"
                            :class="['flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors',
                                activeTab === tab.key
                                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                                    : 'border-transparent text-surface-500 hover:text-surface-700 dark:hover:text-surface-300']">
                            <component :is="tab.icon" class="h-4 w-4" />
                            {{ tab.label }}
                        </button>
                    </nav>
                </div>

                <!-- ── Personal Info tab ── -->
                <div v-if="activeTab === 'personal'" class="p-6">
                    <div v-if="status === 'success'" class="mb-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        Profile updated successfully.
                    </div>

                    <form @submit.prevent="updateProfile" class="space-y-5">
                        <!-- First + Last name -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="label">First Name</label>
                                <input v-model="firstName" required class="input" placeholder="First name" />
                            </div>
                            <div>
                                <label class="label">Last Name</label>
                                <input v-model="lastName" class="input" placeholder="Last name" />
                            </div>
                        </div>
                        <p v-if="profileForm.errors.name" class="text-xs text-red-600 -mt-3">{{ profileForm.errors.name }}</p>

                        <!-- Email -->
                        <div>
                            <label class="label">Email Address</label>
                            <div class="relative">
                                <input type="email" v-model="profileForm.email" required class="input pr-10" />
                                <CheckCircle v-if="isVerified"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                            </div>
                            <p v-if="isVerified" class="mt-1 text-xs text-green-600 font-medium">Email verified</p>
                            <p v-else class="mt-1 text-xs text-orange-500">Email not verified</p>
                            <p v-if="profileForm.errors.email" class="mt-1 text-xs text-red-600">{{ profileForm.errors.email }}</p>
                        </div>

                        <!-- Phone -->
                        <div>
                            <label class="label">Phone <span class="text-surface-400 font-normal">(optional)</span></label>
                            <input v-model="profileForm.phone" class="input" placeholder="+92 300 1234567" />
                        </div>

                        <!-- Avatar file input -->
                        <div>
                            <label class="label">Avatar</label>
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex-shrink-0 flex items-center justify-center">
                                    <img v-if="avatarPreview" :src="avatarPreview" class="w-full h-full object-cover" />
                                    <span v-else class="text-sm font-bold text-blue-600">{{ userInitials }}</span>
                                </div>
                                <input type="file" accept="image/jpeg,image/png,image/gif,image/webp"
                                    class="block w-full text-sm text-surface-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-surface-200 file:text-sm file:font-medium file:bg-white dark:file:bg-surface-800 file:cursor-pointer hover:file:bg-surface-50"
                                    @change="onAvatarChange" />
                            </div>
                            <p class="mt-1 text-xs text-surface-400">JPG, PNG — max 2MB</p>
                        </div>

                        <!-- Actions -->
                        <div class="flex justify-end gap-3 pt-2 border-t border-surface-100 dark:border-surface-800">
                            <button type="button" @click="firstName = nameParts[0] || ''; lastName = nameParts.slice(1).join(' ') || ''; profileForm.reset()"
                                class="btn-secondary">Cancel</button>
                            <button type="submit" :disabled="profileForm.processing" class="btn-primary">
                                {{ profileForm.processing ? 'Saving...' : 'Save Changes' }}
                            </button>
                        </div>
                    </form>
                </div>

                <!-- ── Security tab ── -->
                <div v-if="activeTab === 'security'" class="p-6 space-y-6">
                    <div>
                        <h3 class="font-semibold text-surface-900 dark:text-white mb-1">Change Password</h3>
                        <p class="text-sm text-surface-500 mb-5">Use a strong password with at least 8 characters, mixed case and numbers.</p>

                        <form @submit.prevent="updatePassword" class="space-y-4 max-w-lg">
                            <div>
                                <label class="label">Current Password</label>
                                <input type="password" v-model="passwordForm.current_password" required class="input" autocomplete="current-password" />
                                <p v-if="passwordForm.errors.current_password" class="mt-1 text-xs text-red-600">{{ passwordForm.errors.current_password }}</p>
                            </div>
                            <div>
                                <label class="label">New Password</label>
                                <input type="password" v-model="passwordForm.password" required class="input" autocomplete="new-password" />
                                <p v-if="passwordForm.errors.password" class="mt-1 text-xs text-red-600">{{ passwordForm.errors.password }}</p>
                            </div>
                            <div>
                                <label class="label">Confirm New Password</label>
                                <input type="password" v-model="passwordForm.password_confirmation" required class="input" autocomplete="new-password" />
                            </div>
                            <div class="flex justify-end gap-3 pt-2 border-t border-surface-100 dark:border-surface-800">
                                <button type="button" @click="passwordForm.reset()" class="btn-secondary">Cancel</button>
                                <button type="submit" :disabled="passwordForm.processing" class="btn-primary">
                                    {{ passwordForm.processing ? 'Updating...' : 'Update Password' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- ── Preferences tab ── -->
                <div v-if="activeTab === 'preferences'" class="p-6">
                    <h3 class="font-semibold text-surface-900 dark:text-white mb-1">Preferences</h3>
                    <p class="text-sm text-surface-500 mb-5">Manage your notification and display preferences.</p>
                    <div class="rounded-xl border border-surface-200 dark:border-surface-700 p-4 text-sm text-surface-500 text-center py-10">
                        Preferences settings coming soon.
                    </div>
                </div>
            </div>

            <!-- ── Danger Zone ── -->
            <div class="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 p-5 space-y-3">
                <div class="flex items-center gap-2 mb-4">
                    <AlertTriangle class="h-5 w-5 text-red-500" />
                    <h3 class="font-bold text-red-600 dark:text-red-400">Danger Zone</h3>
                </div>

                <!-- Delete Account row -->
                <div class="flex items-center justify-between bg-white dark:bg-surface-900 rounded-xl border border-red-100 dark:border-red-900/30 px-4 py-3">
                    <div>
                        <p class="text-sm font-semibold text-surface-900 dark:text-white">Delete Account</p>
                        <p class="text-xs text-surface-500 mt-0.5">Permanently delete your account and all associated data</p>
                    </div>
                    <button @click="showDeleteModal = true"
                        class="btn bg-red-600 text-white hover:bg-red-700 text-sm flex-shrink-0">
                        Delete Account
                    </button>
                </div>

                <!-- Clear Data row -->
                <div class="flex items-center justify-between bg-white dark:bg-surface-900 rounded-xl border border-red-100 dark:border-red-900/30 px-4 py-3">
                    <div>
                        <p class="text-sm font-semibold text-surface-900 dark:text-white">Clear All Data</p>
                        <p class="text-xs text-surface-500 mt-0.5">Remove all search history and saved leads</p>
                    </div>
                    <button @click="showClearModal = true"
                        class="btn bg-red-600 text-white hover:bg-red-700 text-sm flex-shrink-0">
                        Clear Data
                    </button>
                </div>
            </div>

        </div>

        <!-- ── Delete Account Modal ── -->
        <Teleport to="body">
            <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" @click.self="showDeleteModal = false">
                <div class="card p-6 w-full max-w-md shadow-2xl">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle class="h-5 w-5 text-red-600" />
                        </div>
                        <h3 class="text-lg font-bold text-surface-900 dark:text-white">Delete Account?</h3>
                    </div>
                    <p class="text-sm text-surface-500 mb-4">
                        This will permanently delete your account and all associated data. This action <strong>cannot be undone</strong>. Please enter your password to confirm.
                    </p>
                    <input type="password" v-model="deleteForm.password" placeholder="Enter your password" class="input mb-1" />
                    <p v-if="deleteForm.errors.password" class="mb-3 text-xs text-red-600">{{ deleteForm.errors.password }}</p>
                    <div class="flex justify-end gap-3 mt-4">
                        <button @click="showDeleteModal = false" class="btn-secondary">Cancel</button>
                        <button @click="deleteAccount" :disabled="deleteForm.processing"
                            class="btn bg-red-600 text-white hover:bg-red-700">
                            {{ deleteForm.processing ? 'Deleting...' : 'Delete Account' }}
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>

        <!-- ── Clear Data Modal ── -->
        <Teleport to="body">
            <div v-if="showClearModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" @click.self="showClearModal = false">
                <div class="card p-6 w-full max-w-md shadow-2xl">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle class="h-5 w-5 text-orange-600" />
                        </div>
                        <h3 class="text-lg font-bold text-surface-900 dark:text-white">Clear All Data?</h3>
                    </div>
                    <p class="text-sm text-surface-500 mb-4">
                        This will permanently remove all your search history and saved leads. Your account will remain active. This action <strong>cannot be undone</strong>.
                    </p>
                    <div class="flex justify-end gap-3">
                        <button @click="showClearModal = false" class="btn-secondary">Cancel</button>
                        <button @click="clearData" class="btn bg-red-600 text-white hover:bg-red-700">
                            Yes, Clear Data
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>

    </AuthenticatedLayout>
</template>
