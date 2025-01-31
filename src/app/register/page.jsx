export default function Register() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to register');

      alert('Inscrição realizada com sucesso!');
      setEmail('');
    } catch (error) {
      alert('Erro ao se inscrever. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="mb-10 text-gray-700 text-xl font-bold">Inscreva-se para receber notificações por e-mail.</p>
    </>
  );
}
