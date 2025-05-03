import { useState } from "react";
import { Select } from "antd";
import { Company } from "../dashboard/CompanySearcher";

const { Option } = Select;

interface FilterComboProps {
  readonly onTextFieldChange: (newText: string) => void;
  readonly selectedCompanies: readonly Company[];
  readonly onSelectedCompany: (newCompany: Company) => void;
  readonly companies: readonly Company[];
}

export default function FilterCombo({
  onTextFieldChange,
  selectedCompanies,
  onSelectedCompany,
  companies,
}: FilterComboProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (value: string) => {
    setInputValue(value);
    onTextFieldChange(value);
  };

  const handleSelect = (code: string | undefined) => {
    if (!code) return;
    const company = companies.find(c => c.code === code);
    if (company) {
      onSelectedCompany(company);
    }
    setInputValue('');
  };

  const filteredOptions = companies.filter((company) => {
    const lowerInput = inputValue.toLowerCase();
    const isMatch =
      company.code.toLowerCase().includes(lowerInput) ||
      company.name.toLowerCase().includes(lowerInput);
    const isSelected = selectedCompanies.some(
      selected => selected.code === company.code
    );
    return isMatch && !isSelected;
  });

  return (
    <Select
      showSearch
      value={undefined}
      onSearch={handleSearch}
      onSelect={handleSelect}
      style={{ width: '100%' }}
      filterOption={false}
    >
      {filteredOptions.map((company) => (
        <Option key={company.code} value={company.code}>
          <strong>{company.code}</strong> - {company.name}
        </Option>
      ))}
    </Select>
  );
}