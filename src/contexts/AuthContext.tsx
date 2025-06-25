import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import { getOAuthRedirectURI, validateHTTPS, enforceHTTPS } from '@/lib/oauth-utils';

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Enforce HTTPS in production
  useEffect(() => {
    enforceHTTPS();
    if (!validateHTTPS()) {
      toast.error('OAuth requires HTTPS in production. Redirecting...');
    }
  }, []);

  const signIn = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        // Get user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });

        if (!userInfoResponse.ok) {
          throw new Error('Failed to get user info');
        }

        const userInfo = await userInfoResponse.json();

        const userData: User = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          accessToken: response.access_token,
        };

        setUser(userData);
        
        // Store in localStorage for persistence
        localStorage.setItem('prettymail_user', JSON.stringify(userData));
        localStorage.setItem('prettymail_token', response.access_token);

        toast.success(`Welcome back, ${userInfo.name}!`);
      } catch (error) {
        console.error('Authentication error:', error);
        toast.error('Authentication failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      toast.error('Login failed. Please try again.');
      setIsLoading(false);
    },
    scope: 'https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    redirect_uri: getOAuthRedirectURI(),
    ux_mode: 'popup',
  });

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('prettymail_user');
    localStorage.removeItem('prettymail_token');
    toast.success('Signed out successfully');
  };

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const storedUser = localStorage.getItem('prettymail_user');
        const storedToken = localStorage.getItem('prettymail_token');

        if (storedUser && storedToken) {
          // Verify token is still valid by making a test API call
          const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          } else {
            // Token expired, clear stored data
            localStorage.removeItem('prettymail_user');
            localStorage.removeItem('prettymail_token');
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
        localStorage.removeItem('prettymail_user');
        localStorage.removeItem('prettymail_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  const value: AuthContextType = {
    user,
    signIn,
    signOut,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
