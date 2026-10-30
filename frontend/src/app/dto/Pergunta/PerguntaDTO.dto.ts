import { AlternativaDTO } from "./AlternativaDTO.dto";

export interface PerguntaDTO {
    id : number,
    titulo : string,
    enunciado : string,
    alternativas : AlternativaDTO[]
}