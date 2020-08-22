import React from 'react';
import logoImg from '../../assets/github-explorer.svg';
import { Title, Form } from './style'

const Dashboard: React.FC = () => {
  return (
    <>
    <img src={logoImg} alt="Github explorer" />
    <Title>Dashboard</Title>
    <Form>
      <input placeholder="Digite o nome do repositorio" />
      <button type="submit">Pesquisar</button>
    </Form>
    </>
  )
}

export default Dashboard;