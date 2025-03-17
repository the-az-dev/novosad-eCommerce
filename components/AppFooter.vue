<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <footer
      id="footer"
    class="bg-black text-white mt-16 flex flex-col items-center justify-center p-[20px] w-full"
  >
    <div class="w-full m-auto p-auto px-4 py-8">
      <div class="flex flex-row items-center justify-center w-full">
        <div class="flex flex-col items-center w-full justify-center">
          <h4 class="text-lg font-semibold mb-4">
            {{ t("footer-contact-title") }}
          </h4>
          <div
            class="flex flex-row items-center justify-center w-full gap-[50px]"
          >
            <ul class="space-y-2 text-gray-300 w-[250px]">
              <li class="font-semibold">
                {{ t("footer-contact-otp-plants-title") }}
              </li>
              <li>{{ t("footer-email-title") }} novosadsm@ukr.net</li>
              <li>{{ t("footer-phone-title") }} +38 050 378 24 72</li>
              <li class="font-semibold">
                {{ t("novosad-contact-sm-full-name") }}
              </li>
            </ul>
            <ul class="space-y-2 text-gray-300 w-[250px]">
              <li class="font-semibold">
                {{ t("footer-contact-single-plant-title") }}
              </li>
              <li>{{ t("footer-email-title") }} novosadsm@ukr.net</li>
              <li>
                {{ t("footer-phone-title") }} +38 050 036 32 90,<br />+38 068
                065 40 11
              </li>
              <li class="font-semibold">
                {{ t("novosad-contact-sm-full-name") }}
              </li>
            </ul>
            <ul class="space-y-2 text-gray-300 w-[250px]">
              <li class="font-semibold">
                {{ t("footer-contact-security-plant-title") }}
              </li>
              <li>{{ t("footer-email-title") }} novosadss@ukr.net</li>
              <li>{{ t("footer-phone-title") }} +380 99 736 13 08</li>
              <li class="font-semibold">
                {{ t("novosad-contact-ss-full-name") }}
              </li>
            </ul>
            <ul class="space-y-2 text-gray-300 w-[250px]">
              <li class="font-semibold">
                {{ t("footer-contact-boilerplates-title") }}
              </li>
              <li>{{ t("footer-email-title") }} ira_novosad@ukr.net</li>
              <li>{{ t("footer-phone-title") }} +38 095 220 03 53</li>
              <li class="font-semibold">
                {{ t("novosad-contact-is-full-name") }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="border-t border-gray-600 mt-8 pt-8 flex flex-row items-center justify-around"
      >
        <div class="w-full max-w-[30vh]">
          <h4 class="text-lg font-semibold mb-4">
            {{ t("footer-address-title") }}
          </h4>
          <ul class="space-y-2 text-gray-300 w-[250px]">
            <li>{{ t("footer-address-content") }}</li>
          </ul>
        </div>
        <div>
          <p>{{ t("footer-social-media-title") }}</p>
          <ul class="flex flex-row gap-[10px] items-center mt-[20px]">
            <li>
              <NuxtLink to="https://novosad.prom.ua/ua/">
                <img
                  src="/img/footer/prom.png"
                  alt="novosad.prom.ua"
                  class="bg-white w-[120px] rounded-lg p-[6px]"
              /></NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://www.facebook.com/novosadinua">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency/48/facebook-new.png"
                  alt="facebook-new"
              /></NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400 flex flex-row items-center justify-center"
      >
        <p>
          &copy; {{ new Date().getFullYear() + " " + t("company-nane") + " " + t("all-copy-secured-footer-title") }}
        </p>
      </div>
    </div>
  </footer>
</template>
