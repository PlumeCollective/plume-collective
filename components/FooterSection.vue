<template>
  <footer class="bg-white text-neutral px-8 py-12 border-t">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Logo + Punchline -->
      <div>
        <img
          src="/full-logo.svg"
          alt="Plume Collective full logo"
          class="w-40 h-auto"
        />
        <p class="mt-4 text-sm font-semibold text-neutral">Punchline</p>
      </div>

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div class="space-y-2">
          <h3 class="font-bold text-xs uppercase text-neutral-content">Site</h3>
          <ul class="space-y-1">
            <li><a href="#" class="link link-hover">About us</a></li>
            <li><a href="#" class="link link-hover">Partner program</a></li>
            <li><a href="#" class="link link-hover">Career</a></li>
            <li><a href="#" class="link link-hover">Contact us</a></li>
            <li><a href="#" class="link link-hover">Privacy Policy</a></li>
          </ul>
        </div>
        <div class="space-y-2">
          <h3 class="invisible">-</h3>
          <ul class="space-y-1">
            <li><a href="#" class="link link-hover">Pricing</a></li>
            <li><a href="#" class="link link-hover">Reviews</a></li>
            <li><a href="#" class="link link-hover">Direct Mail Academy</a></li>
            <li><a href="#" class="link link-hover">Success stories</a></li>
            <li>
              <a href="#" class="link link-hover">Terms &amp; conditions</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="text-sm space-y-4">
        <h3 class="font-bold text-xs uppercase text-neutral-content">
          Contact
        </h3>
        <p>
          <a
            href="mailto:support@postpilot.com"
            class="link flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12H8m0 0l4 4m-4-4l4-4m8 4a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            support@postpilot.com
          </a>
        </p>
        <p>
          Printed with <span class="text-red-500">❤️</span> at our facility in
          South Carolina.
        </p>
      </div>
    </div>

    <div
      class="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-neutral"
    >
      <p>© 2025 Plume Collective, Inc. All rights reserved.</p>
      <div class="mt-4 md:mt-0 flex space-x-4">
        <button class="btn btn-outline btn-sm">Login</button>
        <button class="btn btn-primary btn-sm">Try it for free</button>
      </div>
    </div>
  </footer>
</template>
