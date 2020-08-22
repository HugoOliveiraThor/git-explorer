import React from 'react';
import { Header, RepositoryInfo, Issues } from './styles';
import { FiChevronsLeft, FiChevronRight} from 'react-icons/fi'
import logoImg from "../../assets/github-explorer.svg";
import { useRouteMatch, Link } from 'react-router-dom';

interface RepositoryParams {
  repository:string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
return (
  <>
  <Header>
    <img src={logoImg} alt="logo" />
    <Link to="/dashboard">
    <FiChevronsLeft size={16} />
    Voltar
    </Link>
  </Header>
  <RepositoryInfo>
    <header>
      <img src="" alt="Ola"></img>
      <div>
        <strong>rockeseat/unform</strong>
        <p>descrição do repositorio</p>
      </div>
    </header>
    <ul>
      <li>
        <strong>1808</strong>
        <span>Stars</span>
      </li>
    </ul>
  </RepositoryInfo>
  <Issues>
  <Link to="oi">
            <div>
              <strong>"senhores"</strong>
              <p>Senhores</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
  </Issues>
  </>
)
} 

export default Repository;