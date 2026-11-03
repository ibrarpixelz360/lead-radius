<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\BlogPost;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;
    protected static ?string $navigationIcon = 'heroicon-o-newspaper';
    protected static ?string $navigationGroup = 'Content';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Content')
                ->schema([
                    Forms\Components\TextInput::make('title')->required()->maxLength(200)
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn ($state, $set, $get, $context) =>
                            $context === 'create' && empty($get('slug'))
                                ? $set('slug', \Illuminate\Support\Str::slug($state))
                                : null),
                    Forms\Components\TextInput::make('slug')->required()->maxLength(220)->unique(ignoreRecord: true),
                    Forms\Components\Textarea::make('excerpt')->rows(2)->maxLength(500),
                    Forms\Components\Textarea::make('content')->required()->rows(15)
                        ->helperText('HTML supported. Use full HTML for rich formatting.'),
                    Forms\Components\TextInput::make('cover_image')->label('Cover image URL'),
                ]),

            Forms\Components\Section::make('SEO')
                ->collapsed()
                ->schema([
                    Forms\Components\TextInput::make('meta_title')->maxLength(200),
                    Forms\Components\Textarea::make('meta_description')->maxLength(500)->rows(2),
                    Forms\Components\TagsInput::make('tags'),
                ]),

            Forms\Components\Section::make('Publishing')
                ->schema([
                    Forms\Components\Select::make('author_id')
                        ->relationship('author', 'name')->searchable(),
                    Forms\Components\DateTimePicker::make('published_at')->default(now()),
                    Forms\Components\Toggle::make('is_published'),
                ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('published_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('title')->searchable()->limit(40),
                Tables\Columns\TextColumn::make('author.name'),
                Tables\Columns\IconColumn::make('is_published')->boolean(),
                Tables\Columns\TextColumn::make('views_count')->sortable(),
                Tables\Columns\TextColumn::make('published_at')->date(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBlogPosts::route('/'),
            'create' => Pages\CreateBlogPost::route('/create'),
            'edit' => Pages\EditBlogPost::route('/{record}/edit'),
        ];
    }
}
