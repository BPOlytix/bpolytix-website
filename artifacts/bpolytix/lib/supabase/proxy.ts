import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function copyResponseState(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((cookie) => {
    to.cookies.set(cookie);
  });

  from.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "location") {
      to.headers.set(key, value);
    }
  });
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });

          Object.entries(headers).forEach(([key, value]) => {
            supabaseResponse.headers.set(key, value);
          });
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();

  const pathname = request.nextUrl.pathname;
  const isDashboardRoute = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isLoginRoute = pathname === "/login";
  const isAuthenticated = Boolean(data?.claims);

  if (!isAuthenticated && isDashboardRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.search = "";

    const response = NextResponse.redirect(redirectUrl);
    copyResponseState(supabaseResponse, response);
    return response;
  }

  if (isAuthenticated && isLoginRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    redirectUrl.search = "";

    const response = NextResponse.redirect(redirectUrl);
    copyResponseState(supabaseResponse, response);
    return response;
  }

  return supabaseResponse;
}
