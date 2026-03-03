# Music Genre Classifier

A machine learning–powered web application that lets you train custom music genre classification models on your own audio datasets. Organize music by genre, upload files into genre folders, train a model using FFT (Fast Fourier Transform) analysis, and classify new audio samples. The project is structured as an Appwrite-backed monorepo: the Next.js app lives in `sites/Praca-magisterska/`, and serverless ML/utility logic runs in `functions/`.

## Features

- **Custom Model Training**: Train your own music genre classification models based on your music library
- **Genre Organization**: Create folders for different music genres and upload training samples
- **FFT Audio Analysis**: Automatic feature extraction using Fast Fourier Transform
- **File Management**: Upload and organize audio files across genre-specific folders
- **Model Classification**: Test your trained models with new audio samples
- **Charts & FFT Visualization**: View frequency/chart visualizations for audio data (dashboard/charts)
- **User Authentication**: Secure multi-user system with individual model management
- **In-Memory Caching**: File and folder caches (`lib/Cache`) to reduce Appwrite reads
- **Dark Mode UI**: Dark theme interface using Radix UI and Dice UI

## Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (React)
- **UI Components**: [Radix UI Themes](https://www.radix-ui.com/themes)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: TypeScript
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & ML
- **Backend**: [Appwrite](https://appwrite.io/) (BaaS)
- **Storage**: Appwrite Buckets for audio file storage
- **Serverless Functions**: Appwrite Functions for ML processing
- **Audio Processing**: FFT (Fast Fourier Transform) for feature extraction
- **Model Training**: Custom ML pipeline for genre classification

## Project Structure

The repository is a monorepo: the root holds Appwrite config and cloud functions; the Next.js app lives under `sites/Praca-magisterska/`.

```
Praca-magisterska/
├── appwrite.config.json     # Appwrite project, DB tables, buckets, functions, sites
├── functions/                # Appwrite serverless functions (Python)
│   ├── FFT/                  # FFT-based audio feature extraction
│   ├── CheckUserPermissions/ # Permission checks
│   ├── TransformAllFilesInFolder/  # Batch transform files in a folder
│   └── getfilesfromfolder/   # List files in a folder
├── sites/
│   └── Praca-magisterska/    # Next.js app (main frontend + API usage)
│       ├── app/              # Next.js App Router
│       │   ├── dashboard/    # Dashboard routes
│       │   │   ├── files/    # Genre folders & audio file management
│       │   │   ├── charts/   # FFT/chart visualizations
│       │   │   └── page.tsx  # Main dashboard (models overview)
│       │   ├── login/        # Authentication
│       │   ├── settings/     # User settings
│       │   ├── layout.tsx    # Root layout
│       │   └── page.tsx      # Landing/home
│       ├── components/       # React components
│       │   ├── Auth/         # Auth UI & protected route wrapper
│       │   ├── Dashboard/    # Dashboard UI
│       │   │   ├── Home/Models/   # Model cards and management
│       │   │   ├── Navigation/   # Sidebar, main nav, sub-nav
│       │   │   ├── Charts/       # Frequency charts, file selection
│       │   │   └── Settings/     # Settings panels & dialogs
│       │   ├── Files/        # File & folder management
│       │   │   ├── FileBrowser/   # File list, upload dialogs
│       │   │   └── FolderBrowser/# Genre folder tree, create/edit dialogs
│       │   └── ui/           # Reusable UI (Radix-based)
│       ├── CodeBehind/       # Custom hooks and page/component logic
│       │   ├── Components/   # useAuthContext, useFileBrowserContext, useChartContext, etc.
│       │   └── Pages/        # useLoginPage, Settings page logic
│       ├── Enums/            # App enums (e.g. Pages)
│       ├── Generated/        # Generated client/types (do not edit)
│       │   └── appwrite/     # Appwrite SDK types, DB IDs, constants
│       ├── hooks/            # Shared hooks (e.g. use-lazy-ref, use-as-ref)
│       ├── lib/              # Core services and utilities
│       │   ├── Cache/        # In-memory caches (ICache, InMemoryFileCache, InMemoryFolderCache)
│       │   ├── Database/     # Appwrite DB services (FileService, FolderService), enums, table/column defs
│       │   ├── Bucket/       # Appwrite storage (bucket client)
│       │   ├── Functions/    # Appwrite function invocation helpers
│       │   └── utils.ts, slugify.ts, appwrite.ts
│       ├── scripts/          # Build/type patches (e.g. patch-appwrite-types.js)
│       └── public/           # Static assets
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An Appwrite instance (cloud or self-hosted)
- Appwrite CLI (for deploying functions)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Praca-magisterska
```

2. Install dependencies for the Next.js app:
```bash
cd sites/Praca-magisterska
npm install
```

3. Set up environment variables:
Create a `.env.local` file in `sites/Praca-magisterska/` with your Appwrite credentials:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_APPWRITE_DATABASE_ID=<your-database-id>
NEXT_PUBLIC_APPWRITE_BUCKET_ID=<your-bucket-id>
# Add other necessary Appwrite configuration
```

4. Set up Appwrite Backend:
   - Use the root `appwrite.config.json` to align with the project’s databases (e.g. `genres`, `files`, `models`), buckets, and functions.
   - Deploy Appwrite functions from the repo root:
     ```bash
     appwrite deploy function
     ```
   - Regenerate client/types from the Next.js site if needed:
     ```bash
     cd sites/Praca-magisterska && npm run generate:appwrite
     ```

5. Run the development server (from `sites/Praca-magisterska/`):
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### 1. **Organize Your Music by Genre**
Create folders for each music genre you want to train (e.g., Rock, Jazz, Classical, Electronic). Each folder represents a classification label.

### 2. **Upload Training Data**
Upload audio files to their respective genre folders. The more diverse your training data, the better your model will perform.

### 3. **Train Your Model**
Once you've uploaded sufficient training data:
- The system extracts audio features using FFT analysis
- Appwrite Functions process the audio files in the cloud
- A custom machine learning model is trained on your dataset
- The trained model is saved for future classifications

### 4. **Classify New Music**
Upload a new audio sample, and your trained model will predict which genre it belongs to based on the patterns it learned.

## Key Features in Detail

### Genre Folder Management
- Create custom folders for each music genre
- Edit folder names to refine your classification categories
- Delete folders and their associated training data
- Visual folder selection with open/closed states

### Audio File Management
- **Drag-and-drop uploads**: Easily upload audio files
- **Multi-file support**: Upload up to 20 files simultaneously (max 3GB each)
- **Real-time progress**: Track upload progress for each file
- **File organization**: Files are automatically linked to their genre folders
- **Storage integration**: Secure file storage using Appwrite Buckets

### Model Training & Classification
- **FFT Feature Extraction**: Automatic audio analysis using Fast Fourier Transform
- **Serverless Processing**: Training happens in Appwrite Functions (scalable and efficient)
- **Model Management**: View, manage, and delete your trained models
- **Genre Prediction**: Upload samples and get instant genre classifications

### User Management
- **Secure Authentication**: Email/password registration and login
- **Protected Routes**: Ensuring only authenticated users can access features
- **User Profiles**: Update email, name, and password
- **Session Management**: Persistent login sessions with Appwrite

## Scripts

Run from `sites/Praca-magisterska/`:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate:appwrite` - Regenerate Appwrite client/types from root config and apply patches
- `npm run patch:appwrite` - Apply type patches to generated Appwrite code

## Machine Learning Architecture

### Audio Processing Pipeline
1. **Upload**: Users upload audio files to genre-specific folders
2. **Storage**: Files are stored in Appwrite Buckets
3. **Feature Extraction**: Appwrite Function processes audio using FFT
4. **Training**: ML model trains on extracted features
5. **Model Storage**: Trained model saved to database
6. **Classification**: New samples processed and classified

### FFT (Fast Fourier Transform)
The application uses FFT to convert audio signals from the time domain to the frequency domain, extracting:
- Frequency spectrum
- Magnitude values
- Spectral features (useful for genre classification)

## Usage Example

```typescript
// 1. Create genre folders
Rock/
Jazz/
Classical/
Electronic/

// 2. Upload training samples
Rock/
  ├── rock_sample_1.mp3
  ├── rock_sample_2.mp3
  └── rock_sample_3.mp3
Jazz/
  ├── jazz_sample_1.mp3
  └── jazz_sample_2.mp3

// 3. Train model via dashboard
// 4. Upload new sample and get prediction
// Result: "This sample is 87% likely to be Rock"
```

## Configuration

The project uses modern configuration files:
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS v4 configuration
- `eslint.config.mjs` - ESLint configuration
- `components.json` - shadcn/ui component configuration

## Design Patterns

This project follows several best practices:
- **Separation of Concerns**: UI components separated from business logic
- **Custom Hooks**: Reusable logic encapsulated in hooks (e.g., `useAuthContext`, `useFileBrowserContext`)
- **Protected Routes**: HOC pattern for authentication guards
- **Context API**: Centralized state management for authentication
- **Serverless Architecture**: ML processing offloaded to Appwrite Functions
- **Type Safety**: Full TypeScript implementation for robust code

## Future Enhancements

- [ ] Multiple ML model algorithms (SVM, Neural Networks, Random Forest)
- [ ] Visualization of audio spectrograms
- [ ] Model performance metrics and accuracy reports
- [ ] Batch classification for multiple files
- [ ] Export/import trained models
- [ ] Audio preprocessing options (normalization, filtering)
- [ ] Advanced feature extraction (MFCC, Spectral Centroid)
- [ ] Model comparison and A/B testing
- [ ] Real-time audio classification from microphone input
- [ ] Collaborative model training with shared datasets

## Contributing
At the time being - feel free to fork my work, but I will not accept any external PR. 

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/) and [DiceUI](https://www.diceui.com/) 
- Powered by [Appwrite](https://appwrite.io/)
