import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

const startBalance = 1000;
const testBankAcc = getBankAccount(startBalance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(testBankAcc).toEqual({
      _balance: startBalance,
    });
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => testBankAcc.withdraw(1100)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => getBankAccount(1).transfer(2, testBankAcc)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => testBankAcc.transfer(2, testBankAcc)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const deposit = 200;
    testBankAcc.deposit(deposit);
    expect(testBankAcc.getBalance()).toBe(startBalance + deposit);
  });

  test('should withdraw money', () => {
    const withdrawValue = 50;
    testBankAcc.withdraw(withdrawValue);
    expect(testBankAcc.getBalance()).toBe(1150);
  });

  test('should transfer money', () => {
    const user1 = getBankAccount(100);
    const user2 = getBankAccount(200);
    user1.transfer(50, user2);
    expect(user1.getBalance()).toBe(50);
    expect(user2.getBalance()).toBe(250);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const data = await getBankAccount(startBalance).fetchBalance();
    data === null
      ? expect(typeof data).not.toBe('number')
      : expect(typeof data).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(startBalance);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(10);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
