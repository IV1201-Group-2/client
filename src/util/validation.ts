import i18n from "@/i18n";
const { t } = i18n.global;

type ValidationResult = string | boolean;
type ValidationRule = ValidationResult | PromiseLike<ValidationResult> | ((value: any) => ValidationResult)

export class ValidationBuilder {
    private validations: ValidationRule[];
    private basePath: string;

    constructor(basePath: string) {
        this.validations = []
        this.basePath = basePath;
    }

    private reset() {
        this.validations = []
    }

    public isMandatory(fieldName: string) {
        const getMandatoryField = (value: string, fieldName: string): boolean | string => {
            return value ? true : t(this.basePath + "mandatory", { fieldName });
        }

        this.validations.push((value: string) => getMandatoryField(value, fieldName))
        return this;
    }

    public isEmail() {
        this.validations.push((value: string) => {
            return value.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) ? true : t(this.basePath + "email")
        })

        return this;
    }

    public isPersonNumber() {
        this.validations.push((value: string) =>  value.match(/^\d{6}(?:\d{2})?[-\s]?\d{4}$/) ? true : t(this.basePath + "person-number"))
        return this;
    }

    public build() {
        const validationsToReturn = this.validations;
        this.reset()
        return validationsToReturn;
    }
}