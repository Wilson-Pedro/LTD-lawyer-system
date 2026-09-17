export const paths = {
  login: '/login',
  esqueciSenha: '/esqueci-senha',
  redefinirSenha: '/redefinir-senha',
  acessoNegado: '/acesso-negado',
  home: '/',
  processos: {
    lista: '/processos',
    detalhe: (id: string | number) => `/processos/${id}`,
  },
  demandas: {
    lista: '/demandas',
    detalhe: (id: string | number) => `/demandas/${id}`,
  },
  estagiarios: {
    lista: '/estagiarios',
    detalhe: (id: string | number) => `/estagiarios/${id}`,
    novo: '/estagiarios/novo',
    editar: (id: string | number) => `/estagiarios/${id}/editar`,
  },
  professores: {
    lista: '/professores',
    detalhe: (id: string | number) => `/professores/${id}`,
  },
  advogados: {
    lista: '/advogados',
    detalhe: (id: string | number) => `/advogados/${id}`,
  },
  funcionarios: {
    lista: '/funcionarios',
  },
  assistidos: {
    lista: 'assistidos',
    novo: 'assistidos/novo',
  },
  configuracoes: '/configuracoes',
  usuarios: '/usuarios',
  criarUsuario: '/usuarios/criar',
  editarUsuario: '/usuarios/editar/:id',
  perfil: '/perfil',
} as const;
