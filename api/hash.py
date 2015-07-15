import hashlib


class GetHash(object):
    """docstring for GetHash"""
    def __init__(self, algorithm):
        super(GetHash, self).__init__()
        self.algorithm = algorithm.lower()

    def gethash(self, text):
        text = text.encode("utf8")
        if self.algorithm == 'md5':
            hash_result = hashlib.md5(text).hexdigest()
            if hash_result:
                return {'success': True, 'hash': hash_result}
        if self.algorithm == 'sha1':
            hash_result = hashlib.sha1(text).hexdigest()
            if hash_result:
                return {'success': True, 'hash': hash_result}
        if self.algorithm == 'sha224':
            hash_result = hashlib.sha224(text).hexdigest()
            if hash_result:
                return {'success': True, 'hash': hash_result}
        if self.algorithm == 'sha256':
            hash_result = hashlib.sha256(text).hexdigest()
            if hash_result:
                return {'success': True, 'hash': hash_result}
        if self.algorithm == 'sha384':
            hash_result = hashlib.sha384(text).hexdigest()
            if hash_result:
                return {'success': True, 'hash': hash_result}
        if self.algorithm == 'sha512':
            hash_result = hashlib.sha512(text).hexdigest()
            if hash_result:
                return {'success': True, 'hash': hash_result}
        else:
            return {'success': False, 'message': 'Unsupported algorithm'}
