import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import type { PaginationState } from '@tanstack/react-table';
import { PageResponse } from '@/types/pageResponse';

interface UseListaPaginadaOptions<T, TFiltro extends Record<string, any>> {
  fetchFn: (
    params: { pageIndex: number; pageSize: number } & TFiltro,
  ) => Promise<PageResponse<T>>;
  filtroInicial?: TFiltro;
  pageSizeInicial?: number;
  debounceMs?: number;
}

export function useListaPaginada<T, TFiltro extends Record<string, any>>({
  fetchFn,
  filtroInicial = {} as TFiltro,
  pageSizeInicial = 15,
  debounceMs = 400,
}: UseListaPaginadaOptions<T, TFiltro>) {
  const [dados, setDados] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const refetch = () => setRefetchTrigger((prev) => prev + 1);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSizeInicial,
  });

  const [filtro, setFiltro] = useState<TFiltro>(filtroInicial);
  const [filtroDebounced] = useDebouncedValue(filtro, debounceMs);

  useEffect(() => {
    setPagination((prev) =>
      prev.pageIndex === 0 ? prev : { ...prev, pageIndex: 0 },
    );
  }, [filtroDebounced]);

  useEffect(() => {
    let ativo = true; // evita "race condition": ignora resposta de uma busca antiga que chegou atrasada

    setIsLoading(true);
    fetchFn({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      ...filtroDebounced,
    })
      .then((response) => {
        if (!ativo) return;
        setDados(response.content);
        setTotalPages(response.page.totalPages);
        setTotalElements(response.page.totalElements);
      })
      .finally(() => {
        if (ativo) setIsLoading(false);
      });

    return () => {
      ativo = false;
    };
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    filtroDebounced,
    refetchTrigger,
  ]);

  return {
    dados,
    isLoading,
    totalPages,
    totalElements,
    pagination,
    setPagination,
    filtro,
    setFiltro,
  };
}
