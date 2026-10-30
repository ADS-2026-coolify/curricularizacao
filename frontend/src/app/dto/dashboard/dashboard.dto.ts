export type StatusTentativa = 'EM_ANDAMENTO' | 'FINALIZADA' | 'EXPIRADA';

export type NivelExperiencia =
  | 'NENHUMA'
  | 'BASICA'
  | 'INTERMEDIARIA'
  | 'AVANCADA'
  | 'PROFISSIONAL';

export type Escolaridade = 'FUNDAMENTAL' | 'MEDIO' | 'SUPERIOR';

export interface ResumoDashboardDTO {
  totalParticipantes: number;
  qntdEmAndamento: number;
  qntdFinalizada: number;
  qntdExpiradas: number;
  mediaAcertos: number | null;
}

export interface ExperienciaDashboardDTO {
  exp: NivelExperiencia;
  qntdParticipantes: number;
  mediaAcertos: number | null;
}

export interface ResumoTentativaDTO {
  idTentativa: number;
  nome: string;
  idade: number;
  escolaridade: Escolaridade;
  experiencia: NivelExperiencia;
  status: StatusTentativa;
  dataHoraInicio: string;
  dataHoraFim: string | null;
  acertos: number | null;
  totalQuestoes: number;
}

export interface PrincipalDashboardDTO {
  provaAtiva: boolean;
  resumo: ResumoDashboardDTO;
  experiencias: ExperienciaDashboardDTO[];
  tentativas: ResumoTentativaDTO[];
}