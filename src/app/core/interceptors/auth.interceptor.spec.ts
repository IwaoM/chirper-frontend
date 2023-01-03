import { TestBed } from '@angular/core/testing';

import { AccountInterceptor } from './auth.interceptor';

describe('AccountInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AccountInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AccountInterceptor = TestBed.inject(AccountInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
