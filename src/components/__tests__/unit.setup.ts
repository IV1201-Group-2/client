import { config } from "@vue/test-utils";
import { pinia } from "@/main";
import i18n from "../../i18n/index";
import vuetify from "@/vuetify";
import router from "@/router";

config.global.plugins = [i18n, pinia, vuetify, router];
config.global.mocks.$t = (tKey: any) => tKey;
