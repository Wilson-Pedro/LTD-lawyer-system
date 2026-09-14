export const paths = {
  login: '/login',
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
  },
  professores: {
    lista: '/professores',
    detalhe: (id: string | number) => `/professores/${id}`,
  },
  advogados: {
    lista: '/advogados',
    detalhe: (id: string | number) => `/advogados/${id}`,
  },
  configuracoes: '/configuracoes',
  usuarios: '/usuarios',
  criarUsuario: '/usuarios/criar',
  editarUsuario: '/usuarios/editar/:id',
  perfil: '/perfil',
    
} as const;