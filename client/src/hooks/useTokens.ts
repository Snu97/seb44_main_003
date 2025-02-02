export const useTokens = (
  accessToken: string | null,
  refreshToken: string | null
) => {
  if (accessToken) {
    localStorage.setItem('token', accessToken);
  }
  if (refreshToken) {
    localStorage.setItem('refresh', refreshToken);
  }
};
