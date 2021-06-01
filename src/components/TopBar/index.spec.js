import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import router from 'react-router-dom';
import app from '../../lib/app';
import TopBar from '.';

jest.mock('../../lib/app');

describe('TopBar', () => {
  beforeEach(() => {
    router.mockRestore();
    app.mockRestore();
  });

  it('should render without crashing', async () => {
    render(<TopBar />);
    expect(screen.getByText('Bootcamp Admin')).toBeInTheDocument();
  });

  it('should open drawer when toolbar btn is clicked', async () => {
    render(<TopBar />);
    expect(screen.getByText('Bootcamp Admin')).toBeInTheDocument();
    expect(() => screen.getByText('Dashboard')).toThrow();

    const toggleBtn = document.querySelector('.MuiToolbar-root button[aria-label="menu"]');
    userEvent.click(toggleBtn);
    expect(await screen.getByText('Dashboard')).toBeInTheDocument();

    const push = router.useHistory().push;
    userEvent.click(screen.getByText('Dashboard'));
    expect(push).toHaveBeenCalledWith('/');

    userEvent.click(screen.getByText('People'));
    expect(push).toHaveBeenCalledWith('/people');

    userEvent.click(screen.getByText('Contracts'));
    expect(push).toHaveBeenCalledWith('/contracts');

    userEvent.click(screen.getByText('Gigs'));
    expect(push).toHaveBeenCalledWith('/gigs');

    userEvent.click(screen.getByText('Sign out'));
    expect(app.auth.signOut).toHaveBeenCalledTimes(1);

    // Close drawer...
    userEvent.click(document.querySelector('.MuiBackdrop-root'));

    return new Promise((resolve) => {
      setTimeout(() => {
        expect(() => screen.getByText('Dashboard')).toThrow();
        resolve();
      }, 1000);
    });
  });
});
