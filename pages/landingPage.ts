import { Page, Locator } from '@playwright/test';

export class landingPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly signInLink: Locator;
    readonly signUpLink: Locator;


constructor(page: Page){
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'welcome to bookish' });
    this.signInLink = page.getByRole('link', { name: 'sign in' });
    this.signUpLink = page.getByRole('link', { name: 'Create Account' });
}

async goto (){
    await this.page.goto('/');
}

 async clickSignIn() {
    await this.signInLink.click();
  }

  async clickSignUp() {
    await this.signUpLink.click();
  }

}