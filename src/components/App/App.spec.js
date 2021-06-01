import { render, screen, waitFor } from '@testing-library/react';
import app from '../../lib/app';
import App from '.';

jest.mock('../../lib/app');

describe('App', () => {
  beforeEach(() => {
    app.mockRestore();
  });

  it('should show loading when auth user is undefined', () => {
    const { container } = render(<App />);
    const progress = container.querySelector('.MuiCircularProgress-root');
    expect(progress instanceof HTMLDivElement).toBe(true);
  });

  it('should show sign in when not authenticated', async () => {
    app.useApp.mockImplementationOnce(() => ({
      auth: { user: null },
    }));
    render(<App />);
    await waitFor(() => screen.getByLabelText('Email'));
  });

  it('should show...', async () => {
    app.useApp.mockImplementationOnce(() => ({
      auth: { user: {} },
    }));
    render(<App />);
    // await waitFor(() => screen.getByText('Active Cohorts'));
  });
});
