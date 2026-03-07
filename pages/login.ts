import { Page, Locator } from '@playwright/test';

export class loginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly heading: Locator;
    readonly profileHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.errorMessage = page.getByText('Incorrect Email and Password.');
        this.heading = page.getByRole('heading', { name: 'Sign In' });
        this.profileHeader = page.getByRole('heading', { name: 'User Profile' });
    }

    async goto() {
        await this.page.goto('/signin');
    }

    async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}