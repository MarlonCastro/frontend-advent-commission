import { useState } from 'react';

/**
 * Hook customizado para persistir estado no localStorage
 * @param key - Chave única para armazenar no localStorage
 * @param initialValue - Valor inicial se não houver dados salvos
 * @returns [valor, função para atualizar o valor]
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // State para armazenar o valor
  // Passa função de inicialização para useState para que a lógica seja executada apenas uma vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Busca do localStorage pela chave
      const item = window.localStorage.getItem(key);
      // Parse do JSON armazenado ou retorna initialValue se não existir
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se houver erro, retorna initialValue
      console.error(`Erro ao carregar ${key} do localStorage:`, error);
      return initialValue;
    }
  });

  // Retorna uma versão envolvida da função setState do useState que 
  // persiste o novo valor no localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite que value seja uma função para ter a mesma API do useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Salva no state
      setStoredValue(valueToStore);
      
      // Salva no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Implementação mais avançada pode lidar com o erro de forma diferente
      console.error(`Erro ao salvar ${key} no localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;

