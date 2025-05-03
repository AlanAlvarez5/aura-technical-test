import plusIcon from "../../assets/icons/plus-icon.svg";
import { Typography } from "antd";
import type { FC } from "react";
import { Company } from "./CompanySearcher";

const { Text } = Typography;

interface CommonCompaniesProps {
  commonCompanies: Company[];
  handleSelectedCompany: (newCompany: Company) => void;
  selectedCompaniesLength: number;
}

const boxStyle = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: '10px',
  backgroundColor: '#F9F5FD',
  padding: '16px',
  marginTop: '24px',
};

const getItemStyle = (isDisabled: boolean): React.CSSProperties => ({
  border: '1px solid #CFCFD4',
  padding: '8px',
  borderRadius: '4px',
  backgroundColor: 'white',
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  opacity: isDisabled ? 0.5 : 1,
  pointerEvents: isDisabled ? 'none' : 'auto',
  filter: isDisabled ? 'grayscale(100%)' : 'none',
});

const CommonCompanies: FC<CommonCompaniesProps> = ({
  commonCompanies,
  handleSelectedCompany,
  selectedCompaniesLength,
}) => {
  return (
    <>
      {commonCompanies.length > 0 && (
        <div style={boxStyle}>
          {commonCompanies.map((company) => {
            const isDisabled = !company.enable;
            return (
              <div
                key={company.code}
                style={getItemStyle(isDisabled)}
                onClick={() => {
                  if (!isDisabled) handleSelectedCompany(company);
                }}
              >
                <Text strong style={{ marginRight: 6, color: '#101723' }}>
                  {company.code}
                </Text>
                <Text style={{ color: '#101723' }}>{company.name}</Text>
                {!isDisabled && (
                  <img
                    src={plusIcon}
                    alt="Plus icon"
                    width={15}
                    style={{
                      display: 'inline',
                      marginLeft: 5,
                      verticalAlign: 'middle',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      <div style={{ backgroundColor: '#F9F5FD', padding: '16px 16px' }}>
        <Text style={{ color: '#4E5159', fontFamily: 'Roboto Condensed', fontWeight: 400 }}>
          {selectedCompaniesLength} companies saved.
        </Text>
      </div>
    </>
  );
};

export default CommonCompanies;