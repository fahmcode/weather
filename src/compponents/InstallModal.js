import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const InstallModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      const { userChoice } = await deferredPrompt.prompt();
      setDeferredPrompt(null);

      // Handle the user's choice
      if (userChoice.outcome === "accepted") {
        console.log("PWA installation accepted");
      } else {
        console.log("PWA installation declined");
      }
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Install App</button>
      <Modal
        isOpen={isModalOpen}
        contentLabel="Install PWA"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <h2>Install Weatherly as a PWA</h2>
        <p>
          Enjoy the benefits of a native app experience right from your browser.
          Add Weatherly to your home screen for faster access and offline
          functionality.
        </p>
        <button onClick={handleInstallClick}>Install</button>
      </Modal>
    </div>
  );
};

export default InstallModal;
