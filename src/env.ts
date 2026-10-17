// Deployment context shared by client scripts.

/** "preview" for PR preview builds, "production" otherwise. */
export const deployEnv: 'preview' | 'production' =
  import.meta.env.VITE_DEPLOY_ENV === 'preview' ? 'preview' : 'production';

export const isPreview = deployEnv === 'preview';
