function TopFilters({
  buyers,
  filters,
  onBuyerChange,
  onDateChange,
  onSearchChange,
}) {
  return (
    <div className="filters-panel">
      <label>
        Buyer
        <select
          className="input-field"
          value={filters.buyer}
          onChange={(e) => onBuyerChange(e.target.value)}
        >
          <option value="">All Buyers</option>
          {buyers.map((buyer) => (
            <option key={buyer} value={buyer}>
              {buyer}
            </option>
          ))}
        </select>
      </label>

      <label>
        Start Date
        <input
          className="input-field"
          type="date"
          value={filters.date}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </label>

      <label className="search-label">
        Invoice Number
        <input
          className="input-field"
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={filters.invoiceNumber}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="00001"
        />
      </label>
    </div>
  );
}

export default TopFilters;
