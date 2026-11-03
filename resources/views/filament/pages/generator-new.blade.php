<x-filament-panels::page>
    <div class="space-y-6" @if($isProcessing) wire:poll.2s="checkProgress" @endif>

        {{-- Top Navigation Tabs --}}
        <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div class="flex space-x-4">
                <button
                    type="button"
                    wire:click="$set('activeTab', 'generator')"
                    class="px-4 py-2 text-sm font-semibold rounded-lg transition-colors {{ $activeTab === 'generator' ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' }}"
                >
                    <div class="flex items-center gap-2">
                        <x-heroicon-o-bolt class="w-4 h-4" />
                        <span>Google Maps Lead Generator</span>
                    </div>
                </button>
                <button
                    type="button"
                    wire:click="$set('activeTab', 'history')"
                    class="px-4 py-2 text-sm font-semibold rounded-lg transition-colors {{ $activeTab === 'history' ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' }}"
                >
                    <div class="flex items-center gap-2">
                        <x-heroicon-o-clock class="w-4 h-4" />
                        <span>Execution History & Batches</span>
                    </div>
                </button>
            </div>

            @if($batchId && ($isProcessing || $generationFinished))
                <button
                    type="button"
                    wire:click="resetGenerator"
                    class="text-xs text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1 font-medium"
                >
                    <x-heroicon-o-arrow-path class="w-3.5 h-3.5" />
                    <span>Start New Search</span>
                </button>
            @endif
        </div>

        @if($activeTab === 'generator')

            {{-- PROGRESS TRACKER (VISIBLE WHEN PROCESSING OR FINISHED) --}}
            @if($isProcessing || $generationFinished)
                <div class="p-6 rounded-2xl border shadow-sm transition-all duration-300 {{ $generationFinished ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800' }}">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            @if($isProcessing)
                                <div class="relative flex h-4 w-4">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-4 w-4 bg-primary-500"></span>
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-gray-900 dark:text-white">Scraping in Progress...</h3>
                                    <p class="text-xs text-gray-500">Batch #{{ $batchId }} · Querying Google Maps Chromium worker</p>
                                </div>
                            @else
                                <div class="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 flex items-center justify-center">
                                    <x-heroicon-o-check-circle class="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-emerald-900 dark:text-emerald-100">Batch Completed!</h3>
                                    <p class="text-xs text-emerald-600 dark:text-emerald-400">Batch #{{ $batchId }} · Processed all requested queries</p>
                                </div>
                            @endif
                        </div>

                        <div class="text-right">
                            <span class="text-2xl font-black {{ $generationFinished ? 'text-emerald-600' : 'text-primary-600' }}">{{ $batchProgress }}%</span>
                        </div>
                    </div>

                    {{-- Progress Bar --}}
                    <div class="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 mb-6 overflow-hidden">
                        <div
                            class="h-3 rounded-full transition-all duration-500 {{ $generationFinished ? 'bg-emerald-500' : 'bg-primary-600' }}"
                            style="width: {{ $batchProgress }}%"
                        ></div>
                    </div>

                    {{-- Stat Cards --}}
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div class="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm text-center">
                            <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Jobs</span>
                            <p class="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{{ $batchTotalJobs }}</p>
                        </div>
                        <div class="p-4 rounded-xl bg-white dark:bg-gray-800 border border-emerald-100 dark:border-emerald-900/30 shadow-sm text-center">
                            <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Completed</span>
                            <p class="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{{ $batchCompletedJobs }}</p>
                        </div>
                        <div class="p-4 rounded-xl bg-white dark:bg-gray-800 border border-rose-100 dark:border-rose-900/30 shadow-sm text-center">
                            <span class="text-xs font-semibold text-rose-500 uppercase tracking-wider">Failed</span>
                            <p class="text-2xl font-extrabold text-rose-500 mt-1">{{ $batchFailedJobs }}</p>
                        </div>
                        <div class="p-4 rounded-xl bg-white dark:bg-gray-800 border border-primary-100 dark:border-primary-900/30 shadow-sm text-center">
                            <span class="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">Leads Found</span>
                            <p class="text-2xl font-extrabold text-primary-600 dark:text-primary-400 mt-1">{{ $batchTotalLeads }}</p>
                        </div>
                    </div>

                    {{-- Action buttons & Safe notice --}}
                    @if($isProcessing)
                        <div class="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl text-blue-700 dark:text-blue-300 text-xs">
                            <x-heroicon-o-information-circle class="w-4 h-4 shrink-0" />
                            <span><strong>You can safely close this tab.</strong> The scraping worker continues running in the background and updates your lead radius pool asynchronously.</span>
                        </div>
                    @else
                        <div class="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                wire:click="viewLogs({{ $batchId }})"
                                class="px-4 py-2 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                            >
                                View Worker Logs
                            </button>
                            <button
                                type="button"
                                wire:click="exportBatchCsv({{ $batchId }})"
                                class="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm"
                            >
                                <x-heroicon-o-arrow-down-tray class="w-3.5 h-3.5" />
                                <span>Export Leads (CSV)</span>
                            </button>
                            <button
                                type="button"
                                wire:click="resetGenerator"
                                class="px-4 py-2 rounded-lg text-xs font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center gap-1.5 shadow-sm"
                            >
                                <x-heroicon-o-sparkles class="w-3.5 h-3.5" />
                                <span>Generate More</span>
                            </button>
                        </div>
                    @endif
                </div>
            @endif

            {{-- SEARCH CONFIGURATION FORM --}}
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {{-- Left Column: Category & Keyword Selector (2 Cols wide) --}}
                <div class="lg:col-span-2 space-y-6">
                    <div class="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
                         x-data="{
                             search: '',
                             customInput: '',
                             allCategories: @js($predefinedCategories),
                             get filteredCategories() {
                                 if (!this.search) return this.allCategories;
                                 return this.allCategories.filter(c => c.toLowerCase().includes(this.search.toLowerCase()));
                             }
                         }"
                    >
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <x-heroicon-o-tag class="w-5 h-5 text-primary-500" />
                                    <span>Business Categories & Keywords</span>
                                </h3>
                                <p class="text-xs text-gray-500 mt-0.5">Select target niches or type custom keywords.</p>
                            </div>

                            <div class="flex items-center gap-2">
                                <button
                                    type="button"
                                    wire:click="selectAllKeywords"
                                    class="text-xs text-primary-600 hover:underline font-medium"
                                >
                                    Select All
                                </button>
                                <span class="text-gray-300">·</span>
                                <button
                                    type="button"
                                    wire:click="clearAllKeywords"
                                    class="text-xs text-rose-500 hover:underline font-medium"
                                >
                                    Clear
                                </button>
                                <span class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300">
                                    {{ count($keywords) }} selected
                                </span>
                            </div>
                        </div>

                        {{-- Add Custom Category Input --}}
                        <div class="flex gap-2 mb-4">
                            <input
                                type="text"
                                x-model="customInput"
                                @keydown.enter.prevent="if (customInput.trim()) { $wire.saveCustomCategory(customInput.trim()); customInput = ''; }"
                                placeholder="Type custom keyword and press Enter (e.g. Solar Panel Installer, Boutique Hotel)..."
                                class="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                            />
                            <button
                                type="button"
                                @click="if (customInput.trim()) { $wire.saveCustomCategory(customInput.trim()); customInput = ''; }"
                                class="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-colors"
                            >
                                Add
                            </button>
                        </div>

                        {{-- Search Filter for Categories --}}
                        <div class="relative mb-3">
                            <x-heroicon-o-magnifying-glass class="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                            <input
                                type="text"
                                x-model="search"
                                placeholder="Filter suggestions below..."
                                class="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                            />
                        </div>

                        {{-- Badges Cloud --}}
                        <div class="max-h-60 overflow-y-auto p-1 space-y-2">
                            <div class="flex flex-wrap gap-2">
                                <template x-for="cat in filteredCategories" :key="cat">
                                    <button
                                        type="button"
                                        @click="$wire.toggleKeyword(cat)"
                                        :class="{
                                            'bg-primary-600 text-white border-primary-600 shadow-sm': $wire.keywords.includes(cat),
                                            'bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-400': !$wire.keywords.includes(cat)
                                        }"
                                        class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5"
                                    >
                                        <span x-text="cat"></span>
                                        <span x-show="$wire.keywords.includes(cat)">
                                            <x-heroicon-s-check class="w-3.5 h-3.5" />
                                        </span>
                                    </button>
                                </template>
                            </div>
                        </div>

                        @error('keywords')
                            <p class="text-xs text-rose-500 font-medium mt-2">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                {{-- Right Column: Locations & Execution Options (1 Col wide) --}}
                <div class="space-y-6">

                    {{-- Location Selection Card --}}
                    <div class="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <x-heroicon-o-map-pin class="w-5 h-5 text-emerald-500" />
                                    <span>Target Locations</span>
                                </h3>
                                <p class="text-xs text-gray-500 mt-0.5">Select Australian states or enter custom area.</p>
                            </div>

                            <div class="flex items-center gap-1">
                                <button
                                    type="button"
                                    wire:click="selectAllStates"
                                    class="text-xs text-primary-600 hover:underline font-medium"
                                >
                                    All
                                </button>
                                <span class="text-gray-300">·</span>
                                <button
                                    type="button"
                                    wire:click="clearAllStates"
                                    class="text-xs text-rose-500 hover:underline font-medium"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>

                        {{-- Australian States Grid --}}
                        <div class="grid grid-cols-2 gap-2 mb-4">
                            @foreach($states as $s)
                                <button
                                    type="button"
                                    wire:click="toggleState('{{ $s['name'] }}')"
                                    class="px-2.5 py-2 rounded-lg text-xs font-medium border text-left flex items-center justify-between transition-colors {{ in_array($s['name'], $selectedStates, true) ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700' : 'bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300' }}"
                                >
                                    <span class="truncate">{{ $s['name'] }}</span>
                                    <span class="font-bold text-[10px] text-gray-400 uppercase ml-1">{{ $s['short'] }}</span>
                                </button>
                            @endforeach
                        </div>

                        {{-- Custom Location / City --}}
                        <div>
                            <label class="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                                Custom City / Suburb (Optional)
                            </label>
                            <input
                                type="text"
                                wire:model.defer="customLocation"
                                placeholder="e.g. Brisbane QLD, Gold Coast, or Melbourne"
                                class="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        @error('selectedStates')
                            <p class="text-xs text-rose-500 font-medium mt-2">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Lead Limits & Start Generator Card --}}
                    <div class="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-5">
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                    <x-heroicon-o-adjustments-horizontal class="w-4 h-4 text-primary-500" />
                                    <span>Target Leads Count</span>
                                </label>
                                <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                                    {{ $limit }} Leads
                                </span>
                            </div>

                            <input
                                type="range"
                                min="10"
                                max="200"
                                step="10"
                                wire:model.live="limit"
                                class="w-full accent-primary-600 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                            />
                            <div class="flex justify-between text-[11px] text-gray-400 mt-1">
                                <span>10</span>
                                <span>50</span>
                                <span>100</span>
                                <span>150</span>
                                <span>200</span>
                            </div>
                        </div>

                        {{-- Dispatched Job Estimate Notice --}}
                        @php
                            $locCount = count($selectedStates) + (trim($customLocation) !== '' ? 1 : 0);
                            $jobCount = max(1, count($keywords) * max(1, $locCount));
                        @endphp
                        <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                            <div class="flex justify-between">
                                <span>Estimated parallel jobs:</span>
                                <span class="font-bold text-gray-900 dark:text-white">{{ $jobCount }} job(s)</span>
                            </div>
                            <div class="flex justify-between text-gray-500">
                                <span>Target per job:</span>
                                <span>~{{ max(1, (int) ceil($limit / $jobCount)) }} leads</span>
                            </div>
                        </div>

                        {{-- Launch Button --}}
                        <button
                            type="button"
                            wire:click="generate"
                            wire:loading.attr="disabled"
                            class="w-full py-3 px-4 rounded-xl font-bold text-sm bg-primary-600 hover:bg-primary-700 text-white shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            @disabled($isProcessing)
                        >
                            <span wire:loading.remove wire:target="generate" class="flex items-center gap-2">
                                <x-heroicon-o-sparkles class="w-4 h-4" />
                                <span>Start Lead Generator</span>
                            </span>
                            <span wire:loading wire:target="generate" class="flex items-center gap-2">
                                <x-heroicon-o-arrow-path class="w-4 h-4 animate-spin" />
                                <span>Dispatching Scraper Jobs...</span>
                            </span>
                        </button>
                    </div>

                </div>

            </div>

            {{-- RECENT LEADS PREVIEW --}}
            <div class="mt-8 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <x-heroicon-o-building-office-2 class="w-5 h-5 text-primary-500" />
                            <span>{{ $batchId ? "Leads Generated in Batch #{$batchId}" : "Recently Ingested Leads" }}</span>
                        </h3>
                        <p class="text-xs text-gray-500 mt-0.5">Live leads stored in Lead Radius database.</p>
                    </div>

                    @if($batchId)
                        <button
                            type="button"
                            wire:click="exportBatchCsv({{ $batchId }})"
                            class="text-xs font-semibold text-primary-600 hover:underline flex items-center gap-1"
                        >
                            <x-heroicon-o-arrow-down-tray class="w-3.5 h-3.5" />
                            <span>Export Batch Leads CSV</span>
                        </button>
                    @endif
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs text-gray-600 dark:text-gray-300">
                        <thead class="bg-gray-50 dark:bg-gray-800/50 text-[11px] uppercase font-bold text-gray-500 border-b border-gray-200 dark:border-gray-800">
                            <tr>
                                <th class="px-3 py-3">Business Name</th>
                                <th class="px-3 py-3">Category</th>
                                <th class="px-3 py-3">Phone</th>
                                <th class="px-3 py-3">Website</th>
                                <th class="px-3 py-3">Rating</th>
                                <th class="px-3 py-3">Reviews</th>
                                <th class="px-3 py-3">AI Score</th>
                                <th class="px-3 py-3">City / State</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                            @forelse($recentLeads as $lead)
                                <tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                                    <td class="px-3 py-3 font-semibold text-gray-900 dark:text-white">
                                        {{ $lead->business_name }}
                                    </td>
                                    <td class="px-3 py-3">
                                        <span class="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-medium">
                                            {{ $lead->category ?: 'Business' }}
                                        </span>
                                    </td>
                                    <td class="px-3 py-3 font-mono text-[11px]">
                                        {{ $lead->phone ?: '—' }}
                                    </td>
                                    <td class="px-3 py-3 truncate max-w-[150px]">
                                        @if($lead->website)
                                            <a href="{{ $lead->website }}" target="_blank" class="text-primary-600 hover:underline">
                                                {{ parse_url($lead->website, PHP_URL_HOST) ?: $lead->website }}
                                            </a>
                                        @else
                                            <span class="text-gray-400">—</span>
                                        @endif
                                    </td>
                                    <td class="px-3 py-3 font-bold text-amber-500">
                                        ★ {{ $lead->rating ? number_format($lead->rating, 1) : '—' }}
                                    </td>
                                    <td class="px-3 py-3">
                                        {{ $lead->reviews_count }}
                                    </td>
                                    <td class="px-3 py-3">
                                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold {{ $lead->ai_score >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800' }}">
                                            {{ $lead->ai_score ?? 'N/A' }}
                                        </span>
                                    </td>
                                    <td class="px-3 py-3">
                                        {{ $lead->city }} {{ $lead->state ? "({$lead->state})" : '' }}
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="8" class="px-3 py-6 text-center text-gray-400 italic">
                                        No leads found yet. Start a generator run above!
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

        @else

            {{-- HISTORY TAB --}}
            <div class="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <x-heroicon-o-clock class="w-5 h-5 text-primary-500" />
                            <span>Scraper Execution History</span>
                        </h3>
                        <p class="text-xs text-gray-500 mt-0.5">All batch runs, queue execution progress, and logs.</p>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs text-gray-600 dark:text-gray-300">
                        <thead class="bg-gray-50 dark:bg-gray-800/50 text-[11px] uppercase font-bold text-gray-500 border-b border-gray-200 dark:border-gray-800">
                            <tr>
                                <th class="px-3 py-3">Batch ID</th>
                                <th class="px-3 py-3">Started</th>
                                <th class="px-3 py-3">Status</th>
                                <th class="px-3 py-3">Keywords</th>
                                <th class="px-3 py-3">Locations</th>
                                <th class="px-3 py-3">Jobs Completed</th>
                                <th class="px-3 py-3">Leads Found</th>
                                <th class="px-3 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                            @forelse($recentBatches as $b)
                                <tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                                    <td class="px-3 py-3 font-mono font-bold text-gray-900 dark:text-white">
                                        #{{ $b->id }}
                                    </td>
                                    <td class="px-3 py-3">
                                        {{ $b->created_at?->diffForHumans() }}
                                    </td>
                                    <td class="px-3 py-3">
                                        @if($b->status === 'completed')
                                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                                                Completed
                                            </span>
                                        @elseif($b->status === 'processing')
                                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 animate-pulse">
                                                Processing
                                            </span>
                                        @elseif($b->status === 'failed')
                                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
                                                Failed
                                            </span>
                                        @else
                                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                                {{ ucfirst($b->status) }}
                                            </span>
                                        @endif
                                    </td>
                                    <td class="px-3 py-3">
                                        {{ is_array($b->query) ? implode(', ', $b->query) : $b->query }}
                                    </td>
                                    <td class="px-3 py-3">
                                        {{ is_array($b->location) ? implode(', ', $b->location) : $b->location }}
                                    </td>
                                    <td class="px-3 py-3">
                                        {{ $b->completed_jobs }} / {{ $b->total_jobs }}
                                        @if($b->failed_jobs > 0)
                                            <span class="text-rose-500 font-bold">({{ $b->failed_jobs }} failed)</span>
                                        @endif
                                    </td>
                                    <td class="px-3 py-3 font-extrabold text-primary-600">
                                        {{ $b->found_leads }}
                                    </td>
                                    <td class="px-3 py-3 text-right space-x-2">
                                        <button
                                            type="button"
                                            wire:click="viewLogs({{ $b->id }})"
                                            class="text-xs font-semibold text-primary-600 hover:underline"
                                        >
                                            View Logs
                                        </button>
                                        @if($b->found_leads > 0)
                                            <button
                                                type="button"
                                                wire:click="exportBatchCsv({{ $b->id }})"
                                                class="text-xs font-semibold text-emerald-600 hover:underline"
                                            >
                                                CSV
                                            </button>
                                        @endif
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="8" class="px-3 py-6 text-center text-gray-400 italic">
                                        No batches recorded yet.
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

        @endif

        {{-- WORKER LOGS MODAL / DRAWER --}}
        @if($viewingBatchId)
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                <div class="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                        <div>
                            <h4 class="font-bold text-gray-900 dark:text-white">Batch #{{ $viewingBatchId }} Execution Logs</h4>
                            <p class="text-xs text-gray-500">Structured worker output and error telemetry</p>
                        </div>
                        <button
                            type="button"
                            wire:click="closeLogsModal"
                            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <x-heroicon-o-x-mark class="w-5 h-5" />
                        </button>
                    </div>

                    <div class="p-4 overflow-y-auto flex-1 font-mono text-xs space-y-2 bg-gray-950 text-gray-200">
                        @forelse($viewingBatchLogs as $log)
                            <div class="flex items-start gap-2 py-1 border-b border-gray-800">
                                <span class="text-gray-500 shrink-0">{{ $log['created_at'] }}</span>
                                <span class="px-1.5 py-0.2 rounded text-[10px] uppercase font-bold shrink-0 {{ $log['level'] === 'error' ? 'bg-rose-900 text-rose-300' : ($log['level'] === 'warning' ? 'bg-amber-900 text-amber-300' : 'bg-blue-900 text-blue-300') }}">
                                    {{ $log['level'] }}
                                </span>
                                <span class="break-words flex-1">{{ $log['message'] }}</span>
                            </div>
                        @empty
                            <p class="text-gray-500 italic">No logs recorded for this batch yet.</p>
                        @endforelse
                    </div>

                    <div class="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                        <button
                            type="button"
                            wire:click="closeLogsModal"
                            class="px-4 py-1.5 text-xs font-semibold rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        @endif

    </div>
</x-filament-panels::page>
