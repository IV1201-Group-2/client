import { config } from "@vue/test-utils"
import i18n from "../../i18n/index";
import vuetify from "@/vuetify";

config.global.plugins = [i18n, vuetify];
config.global.mocks.$t = (tKey: any) => tKey;