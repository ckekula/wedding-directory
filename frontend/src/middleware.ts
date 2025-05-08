import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Helper function to extract the cookie value from request
function getCookie(name: string, request: NextRequest) {
  const cookie = request.cookies.get(name);
  return cookie ? cookie.value : null;
}

// Route definitions
const publicRoutes = ['/about', '/contact'];
const visitorRoutes = ['/visitor-profile', '/visitor-dashboard'];
const vendorRoutes = ['/vendor-dashboard', '/services/edit'];

// Middleware to handle role-based authentication redirection
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth tokens
  const vendorToken = getCookie('access_tokenVendor', request);
  const visitorToken = getCookie('access_token', request);

  // Check if it's a service edit route
  const serviceEditMatch = pathname.match(/^\/services\/edit\/([^/]+)$/);
  
  if (serviceEditMatch) {
    // For service edit routes, require vendor authentication
    if (!vendorToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // The actual authorization check for the specific vendor
    // will need to be done in the page component since middleware
    // can't access the full application state
    return NextResponse.next();
  }

  // Handle unauthenticated users
  if (!vendorToken && !visitorToken) {
    // Allow access to public routes
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    // If the user is not authenticated and tries to access protected routes, redirect to login
    return NextResponse.redirect(new URL('/visitor-login', request.url));
  }

  // Handle vendor user access
  if (vendorToken) {
    // If vendor tries to access visitor routes, redirect to vendor dashboard
    if (visitorRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/vendor-dashboard', request.url));
    }
  }

  // Handle visitor user access
  if (visitorToken) {
    // If visitor tries to access vendor routes, redirect to visitor dashboard
    if (vendorRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/visitor-dashboard', request.url));
    }
  }

  // If all conditions are satisfied, continue
  return NextResponse.next();
}

// Configure the matcher for middleware to apply to relevant routes
export const config = {
  matcher: [
    '/vendor-dashboard/:path*',   // Apply middleware to all vendor routes
    '/visitor-profile',           // Apply middleware to visitor profile
    '/visitor-dashboard',         // Apply middleware to visitor dashboard
    '/about',                     // Public pages can still have middleware (for logging or tracking)
    '/contact',                   // Add other public routes here
    '/services/edit/:id*',        // Add this pattern
  ],
};