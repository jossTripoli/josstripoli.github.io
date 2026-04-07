# Deploy Next.js to GitHub Pages

This is a Next.js template which can be deployed to GitHub Pages as a static site.

## Deploying to GitHub Pages

1.  Create a new public GitHub repository
2.  Push the starter code to the `main` branch
3.  On GitHub, go to **Settings** > **Pages** > **Source**, and choose **GitHub Actions** as the source
4.  Make a commit and push it to see the changes on GitHub Pages

Congratulations! You should have a URL like:

```bash
https://<github-user-name>.github.io/<github-project-name>/
```

For more information, see our [deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Contact form configuration

The contact form posts to `/api/contact`, validates Google reCAPTCHA v2, and sends mail to `joss@josstripoli.com` through Resend.

Set these environment variables before running:

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
RESEND_API_KEY=your_resend_api_key
CONTACT_SENDER_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

You can start by copying:

```bash
cp .env.example .env
```

> Note: the API route requires a server runtime (Vercel, Node host, etc.). It will not work on a purely static GitHub Pages deployment.
