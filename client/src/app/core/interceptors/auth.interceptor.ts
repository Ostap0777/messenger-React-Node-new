import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');
  const baseUrl = 'http://localhost:3000';

  const authReq = req.clone({
    url: req.url.startsWith('http') ? req.url : `${baseUrl}${req.url}`,
    withCredentials: true,
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return next(authReq);
};
