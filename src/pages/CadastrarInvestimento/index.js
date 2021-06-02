import "antd/dist/antd.css";
import { Button, Layout, Menu, Form, Input, InputNumber, DatePicker, message, Select } from 'antd';
import { Link } from "react-router-dom";
import InvestimentoService from '../../service/InvestimentoService'
import CategoriaService from '../../service/CategoriaService'
import { useEffect, useState } from "react";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

export default function CadastrarInvestimentos() {

    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState();
    useEffect(() => {
        refreshCategorias()
        return () => {

        }
    }, [])

    async function refreshCategorias() {
        CategoriaService.retrieveAllCategoria()
            .then(
                response => {
                    setCategorias(response.data)
                }
            )

    }

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 3 },
    };
    const tailLayout = {
        wrapperCol: { offset: 4, },
    };

    const onFinish = (values) => {
        InvestimentoService.saveInvestimento(values);
        message.success("Investimento salvo com sucesso!")
    }

    const onFinishFailed = (errorInfo) => {
        message.danger("Erro ao cadastrar!")
    }

    function handleChange(value) {
        setCategoria(value);
    }

    return (
        <div className="container">
            <Layout className="Layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/cadastrar-investimento">
                                Cadastrar Investimneto
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
                        <h2>CADASTRAR INVESTIMENTOS</h2>
                        <Form {...layout} name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}

                        >
                            <Form.Item
                                label="Código do ativo"
                                name="codigoAtivo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira o código do ativo!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Valor"
                                name="valorCota"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira o valor da cota!',
                                    },
                                ]}>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                label="Quantidade de cotas"
                                name="quantidadeCotas"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira a qauntidade de cotas!',
                                    },
                                ]}>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                label="Data da compra"
                                name="dataCompra"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira a data da compra!',
                                    },
                                ]}>
                                <DatePicker />
                            </Form.Item>
                            <Form.Item
                                label="Categoria"
                                name="categoria"
                            >
                                <Select style={{ with: '50%' }} onChange={handleChange}>
                                    {categorias.map((item, index) => {
                                        return (
                                            <Option key={item.id} value={index.id}>
                                                {item.nome}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Salvar
                                </Button >
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>My Invest ©2021 Created by Paulo Henrique</Footer>
            </Layout>
        </div>
    );
}