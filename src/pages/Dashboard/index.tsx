import React, { useState, FormEvent, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import api from "../../services/api";
import logoImg from "../../assets/github-explorer.svg";
import { Title, Form, Repositories, Error } from "./style";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Array<Repository>>(() => {
    const storageRepositories = localStorage.getItem('@Githubexplorer:repositories');
    if(storageRepositories) {
      return JSON.parse(storageRepositories);
    } else {
      return []
    }
  });

  useEffect(() => {
    localStorage.setItem('@Githubexplorer:repositories', JSON.stringify(repositories))
  }, [repositories])

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    if(!newRepo) {
      setInputError('Digite o autor/nome do repositório')
      return;
    }
    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      console.log(response.data);
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepo('')
      setInputError('')
    } catch (error) {
      setInputError('Não foi possível encontrar o repositório')
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github explorer" />
      <Title>Explore repositórios no GitHub</Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositorio"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error> }
      <Repositories>
        {repositories.map((repository) => (
          <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
