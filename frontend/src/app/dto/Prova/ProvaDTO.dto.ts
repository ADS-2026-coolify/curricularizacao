import { PerguntaDTO } from "../Pergunta/PerguntaDTO.dto";

export interface ProvaDTO {
    idProva : string,
    titulo : string,
    duracaoMinutos : number,
    listaPerguntas : PerguntaDTO[]
}