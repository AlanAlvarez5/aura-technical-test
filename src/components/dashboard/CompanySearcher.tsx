import { useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import CommonCompanies from "./CommonCompanies";
import searchDataImage from '../../assets/images/search-data-image.svg';
import FilterCombo from "../shared/FilterCombo";

const { Title, Paragraph } = Typography;

export interface Company {
  code: string;
  name: string;
  enable: boolean;
}

export default function CompanySearcher() {
  const [companies, setCompanies] = useState<Company[]>();
  const [commonCompanies, setCommonCompanies] = useState<Company[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);

  useEffect(() => {
    setCommonCompanies([
      { code: "AMZN", name: "Amazon.com Inc.", enable: true },
      { code: "MSFT", name: "Microsoft Corporation", enable: true },
      { code: "ESTC", name: "Elastic", enable: true },
      { code: "U", name: "Unity Software", enable: true },
      { code: "CVNA", name: "Carvana Co", enable: true },
      { code: "EPAM", name: "Epam Systems", enable: true },
      { code: "WBD", name: "Warner Bros", enable: true },
      { code: "DSN", name: "Disney", enable: true },
    ]);
  }, []);

  const handleSelectedCompany = (newCompany: Company) => {
    setSelectedCompanies((prev) => [...prev, newCompany]);

    setCommonCompanies((prev) => {
      const companies = prev.filter(company => company.code !== newCompany.code)
      companies.push({...newCompany, enable: false });
      return companies;
    });
  };

  const handleCompanySearch = async (query: string) => {
    if (!query.trim()) return;
    const filteredCompanies = commonCompanies.filter(company => company.code.includes(query) || company.name.includes(query));
    setCompanies(filteredCompanies);
  };

  const handleTextFieldChange = (newText: string) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(setTimeout(() => {
      handleCompanySearch(newText);
    }, 100));
  };

  return (
    <Row justify="center" align="middle" style={{ gap: 32, width: "100%", padding: 24 }}>
      <Col style={{ maxWidth: 500 }}>
        <Title level={4} style={{ color: "#6869AC" }}>5,000+ companies with data and insight for you</Title>
        <Paragraph style={{ color: "#101723", textShadow: "2px 2px 3px gray", marginBottom: 24 }}>
          Find the company you are interested in. <br />
          This will help us customize your experience.
        </Paragraph>

        <FilterCombo
          onTextFieldChange={handleTextFieldChange}
          selectedCompanies={selectedCompanies}
          onSelectedCompany={handleSelectedCompany}
          companies={companies || []}
        />

        <CommonCompanies
          selectedCompaniesLength={selectedCompanies.length}
          commonCompanies={commonCompanies}
          handleSelectedCompany={handleSelectedCompany}
        />
      </Col>

      <Col>
        <img src={searchDataImage} alt="Search data" style={{ height: 400, width: 400 }} />
      </Col>
    </Row>
  );
}
