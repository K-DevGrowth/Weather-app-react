const ErrorPage = () => {
  return (
    <div className="text-center w-full mx-auto max-w-lg mt-5">
      <img
        className="block mx-auto w-8 brightness-0 dark:brightness-100"
        src="icon-error.svg"
        alt="error icon"
      />
      <h1 className="text-4xl">Something went wrong</h1>
      <p className="pb-2">
        We couldn't connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="secondary-button flex justify-center items-center mx-auto gap-x-2"
      >
        <img
          className="brightness-0 dark:brightness-100"
          src="icon-retry.svg"
          alt="retry icon"
        />
        <span>Retry</span>
      </button>
    </div>
  );
};

export default ErrorPage;
