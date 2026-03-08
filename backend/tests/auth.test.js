// Assigned to: Satyam
const { registerUser, loginUser } = require('../src/services/authService');
const User = require('../src/models/User');
const { hashPassword, comparePassword } = require('../src/utils/passwordHash');

jest.mock('../src/models/User');
jest.mock('../src/utils/passwordHash');
jest.mock('../src/utils/generateToken', () => () => 'mock_token');

describe('authService.registerUser', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should register a new user and return token + user', async () => {
    User.findOne.mockResolvedValue(null);
    hashPassword.mockResolvedValue('hashed_pw');
    User.create.mockResolvedValue({
      _id: 'uid1', name: 'Satyam', email: 'satyam@example.com', role: 'user', avatar: '',
    });

    const result = await registerUser({ name: 'Satyam', email: 'satyam@example.com', password: 'pass123' });

    expect(result.token).toBe('mock_token');
    expect(result.user.email).toBe('satyam@example.com');
  });

  it('should throw 409 if email already exists', async () => {
    User.findOne.mockResolvedValue({ email: 'satyam@example.com' });

    await expect(
      registerUser({ name: 'Satyam', email: 'satyam@example.com', password: 'pass123' })
    ).rejects.toMatchObject({ message: 'Email already registered', statusCode: 409 });
  });
});

describe('authService.loginUser', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should login and return token + user', async () => {
    User.findOne.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: 'uid1', name: 'Satyam', email: 'satyam@example.com',
        role: 'user', avatar: '', password: 'hashed_pw',
      }),
    });
    comparePassword.mockResolvedValue(true);

    const result = await loginUser({ email: 'satyam@example.com', password: 'pass123' });
    expect(result.token).toBe('mock_token');
    expect(result.user.email).toBe('satyam@example.com');
  });

  it('should throw 401 if user not found', async () => {
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(null) });

    await expect(
      loginUser({ email: 'nobody@example.com', password: 'pass123' })
    ).rejects.toMatchObject({ statusCode: 401 });
  });

  it('should throw 401 if password is wrong', async () => {
    User.findOne.mockReturnValue({
      select: jest.fn().mockResolvedValue({ password: 'hashed_pw' }),
    });
    comparePassword.mockResolvedValue(false);

    await expect(
      loginUser({ email: 'satyam@example.com', password: 'wrongpass' })
    ).rejects.toMatchObject({ statusCode: 401 });
  });
});
