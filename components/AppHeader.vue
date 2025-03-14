<template>
    <div class="w-full p-6 text-lg bg-white flex flex-row justify-between items-center">
      <div>
        <h1 class="text-[24px] font-semibold">
            Novosad Shop
        </h1>
      </div>
      <div class="w-[40%]">
        <ol class="flex flex-row justify-around items-center w-full">
            <li class="mr-9"><NuxtLink to="/">Home</NuxtLink></li>
            <li class="mr-9"><NuxtLink to="/products">Products</NuxtLink></li>
            <li class="mr-9"><NuxtLink to="/blog">Blog</NuxtLink></li>
            <li class="mr-9"><NuxtLink to="/contacts">Contacts</NuxtLink></li>
            <li class="mr-9"><NuxtLink to="/orders">Orders and delivery</NuxtLink></li>
            <span class="w-[150px] p-4 bg-black text-white rounded-lg flex flex-row items-center justify-center"><NuxtLink to="https://novosad.prom.ua/">Our Prom</NuxtLink></span>
        </ol>
      </div>
    </div>
  </template>
  