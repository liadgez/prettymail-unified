const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-muted-foreground mb-8">Page not found</p>
      <a href="/" className="text-primary hover:underline">
        Return to PrettyMail
      </a>
    </div>
  );
};

export default NotFound;
