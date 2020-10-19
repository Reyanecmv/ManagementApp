/**
 * IDK, mi-a fost lene sa gasesc enumuri mai dragute. :)
 */
export enum ServiceEnum {
    A, B
}

/**
 * getContent o sa fie pentru a trage toata informatia mapata pe un DTO, in momentul de fata o las void
 * iar mai apoi o sa fie de tipul unei clase abstracte/interfata, depinde cum o gandesc.
 */
export interface IServiceType {
    getContent() : void;
    apply(): void;
}

/**
 * In mod normal orice factory trebuie extins de aici, nu pentru service de baze, pentru orice service daca vrem o mapare
 * mai buna.
 */
export interface IFactory {
    createService(serviceType : ServiceEnum) : IServiceType;
}