const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col gap-3 mb-6 md:flex-row md:items-center md:justify-between">

      <div>
        <h1 className="text-xl font-semibold text-slate-800">
          {title}
        </h1>

    
      </div>
       {subtitle && (
          <p className="text-sm text-slate-500 mt-1">
            {subtitle}
          </p>
        )}

      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
