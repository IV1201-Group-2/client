import i18n from "@/i18n";
const { t } = i18n.global;

type ValidationResult = string | boolean;
type ValidationRule = ValidationResult | PromiseLike<ValidationResult> | ((value: any) => ValidationResult)

/**
 * Util class for composing validation rule sets.
 */
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


    /**
     * Add rule for validating whether the field is empty or not.
     * 
     * @param fieldName the key identifying the field to be made mandatory
     * @returns the builder instance
     */
    public isMandatory(fieldName: string): ValidationBuilder {
        const getMandatoryField = (value: string, fieldName: string): ValidationResult => {
            return value ? true : t(this.basePath + "mandatory", { fieldName });
        }

        this.validations.push((value: string) => getMandatoryField(value, fieldName))
        return this;
    }

    /**
     * Add rule for validating the email format.
     * 
     * @returns the builder instance
     */
    public isEmail(): ValidationBuilder {
        this.validations.push((value: string): ValidationResult => {
            return value.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) ? true : t(this.basePath + "email")
        })

        return this;
    }

    /**
     * Add rule for validating the person number.
     * 
     * @returns the builder instance
     */
    public isPersonNumber(): ValidationBuilder {
        this.validations.push((value: string): ValidationResult =>  value.match(/^\d{6}(?:\d{2})?[-\s]?\d{4}$/) ? true : t(this.basePath + "person-number"))
        return this;
    }

    /**
     * Return all added rules.
     * 
     * @returns the validation rules
     */
    public build(): ValidationRule[] {
        const validationsToReturn = this.validations;
        this.reset()
        return validationsToReturn;
    }
}