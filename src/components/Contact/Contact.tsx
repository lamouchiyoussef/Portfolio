import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      const response = await emailjs.send(
        'service_s2lccnc', // Remplacez par l'ID de votre service
        'template_cthfgnc', // Remplacez par l'ID de votre modèle
        templateParams,
        'jcL7LQmdR4deOpN9H' // Remplacez par votre clé publique (API Key)
      );
      
      console.log('Email envoyé avec succès :', response);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Réinitialiser le formulaire
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contact</h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-6">Contactez-moi</h3>
            <p className="text-gray-600 mb-8">
              N'hésitez pas à me contacter pour discuter de vos projets ou opportunités de collaboration.
            </p>

            <div className="space-y-4">
              <ContactInfo
                icon={<Mail className="w-5 h-5" />}
                title="Email"
                content="youssef.lamouchi@esprit.tn"
              />
              <ContactInfo
                icon={<Phone className="w-5 h-5" />}
                title="Téléphone"
                content="+216 22 554 114"
              />
              <ContactInfo
                icon={<MapPin className="w-5 h-5" />}
                title="Localisation"
                content="Tunis, Ariana"
              />
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Envoi en cours...' : 'Envoyer'}
              </button>

              {status === 'success' && (
                <p className="text-green-600 mt-4">Votre message a été envoyé avec succès!</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 mt-4">Une erreur s'est produite. Veuillez réessayer.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
      {icon}
    </div>
    <div className="ml-4">
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

export default Contact;
