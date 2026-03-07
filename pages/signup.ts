import { Page, Locator } from '@playwright/test';

export class signupPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly signupButton: Locator;
    readonly errormessage: Locator;
    readonly heading: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByPlaceholder('Name');
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password', { exact: true });
        this.confirmPasswordInput = page.getByPlaceholder('Repeat your password');
        this.signupButton = page.getByRole('button', { name: 'Register' });
        this.errormessage = page.getByText('User already exists with this email.');
        this.heading = page.getByRole('heading', { name: 'Sign Up' });
        this.successMessage = page.getByText('Registration Successful! Redirecting...');
    }

    async goto() {
        await this.page.goto('/signup');
    }

    async signup(name: string, email: string, password: string, confirmPassword: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);
        await this.signupButton.click();
    }
}