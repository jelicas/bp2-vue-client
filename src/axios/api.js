import axios from '@/axios/axios.js';

export const api = {
  getAllProducts: () => {
    return axios.get('/products');
  },
  getAllDrugs: () => {
    return axios.get('/drugs');
  },
  getAllTypesOfPackages: () => {
    return axios.get('/packages');
  },
  getAllPrices: () => {
    return axios.get('/prices');
  },
  getAllStates: () => {
    return axios.get('/states');
  },
  getAllSuppliers: () => {
    return axios.get('/suppliers');
  },
  getAllCatalogues: () => {
    return axios.get('/catalogues');
  },
  getAllCatalogueItems: () => {
    return axios.get('/catalogue-items');
  },
  getAllEmployees: () => {
    return axios.get('/employees');
  },
  addProduct: product => {
    return axios.post('/products', product);
  },
  addDrug: drug => {
    return axios.post('/drugs', drug);
  },
  addPackage: packageType => {
    return axios.post('/packages', packageType);
  },
  addPrice: price => {
    return axios.post('/prices', price);
  },
  addState: state => {
    return axios.post('/states', state);
  },
  addSupplier: supplier => {
    return axios.post('/suppliers', supplier);
  },
  addCatalogue: catalogue => {
    return axios.post('/catalogues', catalogue);
  },
  addCatalogueItem: catalogueItem => {
    return axios.post('/catalogue-items', catalogueItem);
  },
  addEmployee: employee => {
    return axios.post('/employees', employee);
  },
  editProduct: (id, product) => {
    return axios.put(`/products/${id}`, product);
  },
  editDrug: (id, drug) => {
    return axios.put(`/drugs/${id}`, drug);
  },
  editPackage: (id, packageType) => {
    return axios.put(`/packages/${id}`, packageType);
  },
  editPrice: (id, price) => {
    return axios.put(`/prices/${id}`, price);
  },
  editState: (id, state) => {
    return axios.put(`/states/${id}`, state);
  },
  editSupplier: (id, supplier) => {
    return axios.put(`/suppliers/${id}`, supplier);
  },
  editCatalogue: (id, catalogue) => {
    return axios.put(`/catalogues/${id}`, catalogue);
  },
  editCatalogueItem: (id, catalogueItem) => {
    return axios.put(`/catalogue-items/${id}`, catalogueItem);
  },
  editEmployee: (id, employee) => {
    return axios.put(`/employees/${id}`, employee);
  },
  deleteProduct: id => {
    return axios.delete(`/products/${id}`);
  },
  deleteDrug: id => {
    return axios.delete(`/drugs/${id}`);
  },
  deletePackage: id => {
    return axios.delete(`/packages/${id}`);
  },
  deletePrice: (id, price) => {
    return axios.delete(`/prices/${id}`, { data: price });
  },
  deleteState: (id, state) => {
    return axios.delete(`/states/${id}`, { data: state });
  },
  deleteSupplier: id => {
    return axios.delete(`/suppliers/${id}`);
  },
  deleteCatalogue: id => {
    return axios.delete(`/catalogues/${id}`);
  },
  deleteCatalogueItem: (id, rbStavke) => {
    return axios.delete(`/catalogue-items/${id}`, { data: rbStavke });
  },
  deleteEmployee: id => {
    return axios.delete(`/employees/${id}`);
  },
};
