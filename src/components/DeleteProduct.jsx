import React, { useState } from 'react';

const DeleteProduct = ({ link }) => {
  const productId = link.substring(link.lastIndexOf("/") + 1);
  const deleteProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3002/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Delete was successful, you might want to update your UI or fetch updated data here
        console.log('Product deleted successfully');
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <h1>ARE YOU SURE WANT TO DELETE?</h1>
      <button onClick={deleteProduct} className='bg-red-200'>YEAH DUDE</button>
      <h1>{productId}</h1>
    </>
  );
};

export default DeleteProduct;
