import type { Ref } from "vue"

interface ServiceBaseUrls {
  REGISTRATION: string
  LOGIN: string
  APPLICATION_FORM: string
  PERSONAL_INFORMATION: string
  RECRUITER: string
  APPLICATION_STATUS: string
}

const domain = "herokuapp.com";

export const BASE_URL: ServiceBaseUrls = {
  REGISTRATION: "https://register-service-c7bdd87bf7fd." + domain,
  LOGIN: "https://login-service-afb21392797e." + domain,
  APPLICATION_FORM: "https://application-form-service-8e764787209b." + domain,
  PERSONAL_INFORMATION: "https://personal-info-service-f25ca556a7c9." + domain,
  RECRUITER: "https://recruiter-service-b2f03b50686a." + domain,
  APPLICATION_STATUS: "https://application-status-service-e3dff919c7c0." + domain
}

export function getSelectableCompetences(loginToken: Ref<string>) {
  const url = BASE_URL.APPLICATION_FORM + "/api/application-form/competences/";
  const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginToken.value}`
      }
  };

  return fetch(url, options);
}