import "antd/dist/antd.css";
import { Table, Button, Layout, Menu, message } from 'antd';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import InvestimentoService from '../../service/InvestimentoService'
const { Header, Content, Footer } = Layout;
const { Column } = Table;

export default function ListarInvestimentos() {
    const [investimentos, setInvestimentos] = useState([]);

    useEffect(() => {
        refreshInvestimos()
        return () => {

        }
    }, [])
    async function refreshInvestimos() {
        InvestimentoService.retrieveAllInvestimento()
            .then(
                response => {
                    setInvestimentos(response.data)
                }
            )

    }

    function remove(record) {
        InvestimentoService.deleteAllInvestimento(record.codigo)
        message.success('Investimento removido com sucesso!');
    }
    return (
        <div className="container">
            <Layout className="Layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">
                            <Link to="/cadastrar-investimento">
                                Cadastrar Investimento
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/listar-investimentos">
                                Listar Investimneto
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        <h2>INVESTIMENTOS</h2>
                        <Table dataSource={investimentos}>
                            <Column title="Código do ativo" dataIndex="codigoAtivo" key="codigoAtivo" />
                            <Column title="Valor" dataIndex="valorCota" key="valorCota" />
                            <Column title="Quantidade de Cotas" dataIndex="quantidadeCotas" key="quantidadeCotas" />
                            <Column title="Data da Compra" dataIndex="dataCompra" key="dataCompra" />
                            <Column title="Remover" key="atualizar"
                                render={(text, record) => (<Button onClick={() => remove(record)}
                                    type="primary">Remover</Button>)}
                            />
                        </Table>
                    </div>
                    <div className="site-layout-content">Content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>My Invest ©2021 Created by Paulo Henrique</Footer>
            </Layout>
        </div>
    );
}